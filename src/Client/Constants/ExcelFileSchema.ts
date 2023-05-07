export const AmbassdorSchema = [
  {
    column: "Name",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.ambassador_title,
  },
  {
    column: "Email",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.email,
  },
  {
    column: "Description",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.description,
  },
  {
    column: "Crypto_wallet",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.crypto_wallet,
  },
  {
    column: "Paypal_Email",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.paypal_email,
  },
  {
    column: "Instagram_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.instagram_link,
  },
  {
    column: "Twitter_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.twitter_link,
  },
  {
    column: "LinkedIn_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.linkedin_link,
  },
  {
    column: "Website_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.website_link,
  },
  {
    column: "Current RP",
    type: Number,
    value: (ambassadorDetail: any) => ambassadorDetail.total_points,
  },
  {
    column: "Lifetime RP",
    type: Number,
    value: (ambassadorDetail: any) => ambassadorDetail.lifetime_points,
  },
  {
    column: "Mailing Address",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_address,
  },
  {
    column: "Mailing City",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_city,
  },
  {
    column: "Mailing State",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_state,
  },
  {
    column: "Mailing Country",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_country,
  },
];
export const AmbassdorCampaignSchema = [
  {
    column: "Name",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.ambassador_title,
  },
  {
    column: "Email",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.email,
  },
  {
    column: "Description",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.description,
  },
  {
    column: "Crypto_wallet",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.crypto_wallet,
  },
  {
    column: "Paypal_Email",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.paypal_email,
  },
  {
    column: "Instagram_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.instagram_link,
  },
  {
    column: "Twitter_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.twitter_link,
  },
  {
    column: "LinkedIn_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.linkedin_link,
  },
  {
    column: "Website_Link",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.website_link,
  },
  {
    column: "Current RP",
    type: Number,
    value: (ambassadorDetail: any) => ambassadorDetail.total_points,
  },
  {
    column: "Lifetime RP",
    type: Number,
    value: (ambassadorDetail: any) => ambassadorDetail.lifetime_points,
  },
  {
    column: "Mailing Address",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_address,
  },
  {
    column: "Mailing City",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_city,
  },
  {
    column: "Mailing State",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_state,
  },
  {
    column: "Mailing Country",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.mailing_country,
  },
  {
    column: "Campaign Title",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.title,
  },
  {
    column: "Campaign RP",
    type: Number,
    value: (ambassadorDetail: any) => ambassadorDetail.points,
  },
  {
    column: "Campaign Completion Status",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.completion_status == 0 ? "Incomplete" : "Complete",
  },
  {
    column: "Archived",
    type: String,
    value: (ambassadorDetail: any) => ambassadorDetail.archeived == 0 ? "No" : "Yes",
  },
];

export const RecruitAmbassadorSchema = [
  {
    column: "Name",
    type: String,
    value: (formList: any) => formList.first_name + " " + formList.last_name,
  },
  {
    column: "Email",
    type: String,
    value: (formList: any) => formList.email,
  },
  {
    column: "Phone Number",
    type: String,
    value: (formList: any) => formList.contact,
  },
  {
    column: "Country",
    type: String,
    value: (formList: any) => formList.country,
  },

]

export const RewardsDetailsSchema = [
  {
    column: "Name",
    type: String,
    value: (rewardDetail: any) => rewardDetail.name ?? "",
  },
  {
    column: "Email",
    type: String,
    value: (rewardDetail: any) => rewardDetail.email ?? "",
  },
  {
    column: "Crypto Wallet",
    type: String,
    value: (rewardDetail: any) => rewardDetail.crypto_wallet ?? "",
  },
  {
    column: "Paypal Email",
    type: String,
    value: (rewardDetail: any) => rewardDetail.paypal_email ?? "",
  },
  {
    column: "Ambassador RP",
    type: Number,
    value: (rewardDetail: any) => rewardDetail.total_points ?? "",
  },
  {
    column: "Mailing Address",
    type: String,
    value: (rewardDetail: any) => rewardDetail.mailing_address ?? "",
  },
  {
    column: "Mailing City",
    type: String,
    value: (rewardDetail: any) => rewardDetail.mailing_city ?? "",
  },
  {
    column: "Mailing State",
    type: String,
    value: (rewardDetail: any) => rewardDetail.mailing_state ?? "",
  },
  {
    column: "Mailing Country",
    type: String,
    value: (rewardDetail: any) => rewardDetail.mailing_country ?? "",
  },
  {
    column: "Reward Ttile",
    type: String,
    value: (rewardDetail: any) => rewardDetail.title ?? "",
  },

  {
    column: "Reward RP",
    type: Number,
    value: (rewardDetail: any) => rewardDetail.points ?? "",
  },
  {
    column: "Reward Description",
    type: String,
    value: (rewardDetail: any) => rewardDetail.reward_desc ?? "",
  },
  {
    column: "Status",
    type: String,
    value: (rewardDetail: any) => rewardDetail.status == 0 ? "Pending" : rewardDetail.status == 1 ? "Claimed" : "Rejected",
  },

];