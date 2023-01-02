import { Injectable } from '@nestjs/common';
import puppeteer, {Page} from 'puppeteer';
import {pipe, curry} from '@fxts/core';
import { UrlService } from 'src/url/url.service';

@Injectable()
export class AmwayService {
    constructor(private urlService: UrlService) {}
    private static BrandNames = {
        'nutrilite':(pageIndex: number): string => `https://www.amway.co.kr/shop/brand-shop/nutrition-brand/nutrilite/c/nutrilite?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'artistry':(pageIndex: number): string => `https://www.amway.co.kr/shop/beauty/c/beauty?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'glister':(pageIndex: number): string => `https://www.amway.co.kr/shop/brand-shop/personal-care-brand/glister/c/glister?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'g&h':(pageIndex: number): string => `https://www.amway.co.kr/shop/brand-shop/personal-care-brand/g-h/c/g-h?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'satinique':(pageIndex: number): string => `https://www.amway.co.kr/shop/brand-shop/personal-care-brand/satinique/c/satinique?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'home':(pageIndex: number): string => `https://www.amway.co.kr/shop/brand-shop/home-brand/amway-home/c/amway-home?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'queen':(pageIndex: number): string => `https://www.amway.co.kr/shop/home/cookware/c/cookware?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'xs':(pageIndex: number): string => `https://www.amway.co.kr/shop/nutrition/xs-energy-drink/c/xs-energy-drink?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`,
        'nByNutrilite':(pageIndex: number): string => `https://www.amway.co.kr/shop/nutrition/n-by-nutrilite/c/n-by-nutrilite?q=%3Anewest-desc-c&sort=&page=${pageIndex}&viewType=list`
    }

    /**
     * Set Product URL data in database
     * @return boolean, true for success update
     */
    async setProductUrlScheduler(){
        // Setup puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        for(const [brand, getBaseURL] of Object.entries(AmwayService.BrandNames)){
            // Update each brand's new url
            const urlInfo = await this.urlService.getURLByBrandName({brandName: brand});
            let pageIndex = urlInfo ? urlInfo.totalPageIndex : 1;
            
            let url = getBaseURL(pageIndex);

            while(true){
                await page.goto(url);
    
                // Check if next page exists
                const hasNext = await page.evaluate(() => {
                    const moreButtonWithForm = document.querySelector('.btn_more-area form');
                    return moreButtonWithForm;
                });
    
                if(hasNext){
                    url = getBaseURL(++pageIndex);
                } else{
                    if(urlInfo){
                        // Update if brand exists
                        this.urlService.setURLByBrandName({
                            where:{brandName: brand},
                            data:{
                                url:url,
                                totalPageIndex: pageIndex
                            }
                        });

                    } else{
                        // Create if brand not exists
                        this.urlService.createURL({
                            url:url,
                            totalPageIndex: pageIndex,
                            brandName: brand
                        });

                    }
                    
                    return true;
                }
            }
        }
    }

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
        const URL = await this.urlService.getURLByBrandName({brandName: brandName})

        if(!URL){
            // Crawl if there's no in database
            await this.setProductUrlScheduler();
            await this.crawlProductByBrand(brandName);
        }

        await page.goto(URL.url);

        const data = await page.evaluate(() => {
            const productItems = document.querySelectorAll('.product_item');
            

            return productItems
        });

        await browser.close()

        return data;
    }
}
