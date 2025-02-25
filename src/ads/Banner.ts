import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from "@capacitor-community/admob"

export default class Banner {

  private BANNER_ID: string = 'ca-app-pub-2077187211919243/2044254577'
  private options: BannerAdOptions
  
  constructor(){
    this.options = {
      adId: 'ca-app-pub-3940256099942544/9214589741', //id de teste
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true
    }
  }
  async showBanner(){
    await AdMob.showBanner(this.options)
  }
  async hideBanner(){
    await AdMob.hideBanner()
    await AdMob.removeBanner()
  }
}