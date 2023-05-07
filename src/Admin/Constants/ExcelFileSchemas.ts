export const ProgramSchema = [
  {
    column: "Title",
    type: String,
    value: (program: any) => program.title,
  },
  {
    column: "Email ID",
    type: String,
    value: (program: any) => program.email,
  },
  {
    column: "Description",
    type: String,
    value: (program: any) => program.description,
  },
  {
    column: "Max Reward",
    type: Number,
    value: (program: any) => program.max_reward,
  },
  {
    column: "Website",
    type: String,
    value: (program: any) => program.website_link,
  },
  {
    column: "Blog",
    type: String,
    value: (program: any) => program.community_group,
  },
  {
    column: "Community Link",
    type: String,
    value: (program: any) => program.community_channel,
  },
];

export const AmbassdorSchema = [
  {
    column: "Name",
    type: String,
    value: (program: any) => program.first_name + " " + program.last_name,
  },
  {
    column: "Email ID",
    type: String,
    value: (program: any) => program.email,
  },
  {
    column: "No Of Programs",
    type: Number,
    value: (program: any) => program.noOfProgram,
  },
  {
    column: "Associated Programs",
    type: String,
    value: (program: any) => program.ProgramNames,
  },
  {
    column: "Twitter",
    type: String,
    value: (program: any) => program.other_details,
  },
  {
    column: "URL",
    type: String,
    value: (program: any) => program.url,
  },
  {
    column: "About",
    type: String,
    value: (program: any) => program.about,
  },
  {
    column: "Industry",
    type: String,
    value: (program: any) => program.industry,
  },
  {
    column: "Country",
    type: String,
    value: (program: any) => program.country,
  },
];
