import { Injectable } from '@nestjs/common';
import puppeteer, {Page} from 'puppeteer';
import {pipe, curry} from '@fxts/core';

@Injectable()
export class AmwayService {
    // Static variable
    private static URLByBrand = {
        'nutrilite': (pageIndex: number) => `https://www.amway.co.kr/shop/brand-shop/nutrition-brand/nutrilite/c/nutrilite?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'artistry': (pageIndex: number) => `https://www.amway.co.kr/shop/beauty/c/beauty?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`
    }

    /**
     * Get product URL for getting max product
     * @params string brandName
     * @params Page page
     * @return Promise<string> finalURL
     */
    private getProductURL = curry(async (brandName: string, page: Page): Promise<string> => {
        let pageIndex = 1;
        let URL = AmwayService.URLByBrand[brandName](pageIndex);

        let diveIn = true;
        while(diveIn){
            await page.goto(URL);
            const hasNext = await page.evaluate(() => {
                const nextFormElement = document.querySelector('.btn_more-area form');
                return nextFormElement;
            })
    
            if(hasNext){
                // Has next page
                URL = AmwayService.URLByBrand[brandName](++pageIndex);
            } else{
                diveIn = false;
            }
        }

        return URL;
    })

    /**
     * crawlProducts
     * crawl all product
     * @param string brandName
     * @return data
     */
    async crawlProductByBrand(brandName: string){
        // Set page for crawling
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const URL = await pipe(
            page,
            this.getProductURL(brandName)
        );

        await page.goto(URL);

        const data = await page.evaluate(() => {
            const productItems = document.querySelectorAll('.product_item');
            
            return productItems
        });

        await browser.close()

        return data;
    }
}
