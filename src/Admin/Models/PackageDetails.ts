export default class PackageDetails {
  id: number = 0;
  plan_id: string = "";
  product_id: string = "";
  title: string = "";
  price: string = "";
  description: string = "";
  checkout_page: string = "";
  ambassador_count: number = 0;
  package_img: string = "";
  allowed_campaign: number = 0;
  allowed_managers: number = 0;
  status: boolean = false;
  timeline: boolean = false;
  referal_campaign: boolean = false;
  custom_email: boolean = false;
  custom_branding: boolean = false;
  leaderboard: boolean = false;
  invite_ambassadors: boolean = false;
  frequency: string = 'm';
  trial_count: number = 0;
  trial_unit: string = "day";
}
