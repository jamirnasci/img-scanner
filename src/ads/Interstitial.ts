import { AdMob, AdOptions } from "@capacitor-community/admob"

export class Interstitial{
  private INTERSTITIAL_ID: string = "ca-app-pub-2077187211919243/3488665355"
  private options: AdOptions

  constructor(){
    this.options = {
      adId: 'ca-app-pub-3940256099942544/1033173712',
      isTesting: true
    }
  }
  async showInterstitial(){
    await AdMob.prepareInterstitial(this.options)
    await AdMob.showInterstitial()
  }
}