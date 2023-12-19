// ----------       Recommendation Model Using Langchain + JavaScript + NodeJS   --------------------

const { OpenAI } = require( "langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");


//Recommendation model
async function myfunc() {

const model = new OpenAI({ openAIApiKey: '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' });
const template = "Please recommend me a list of tablets that healing headache and also give me suggestions {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const response = await model.call(
  await prompt.format({ product: "medicines" }))
  console.log(`Your Result is here :${response}`);

}

myfunc()




