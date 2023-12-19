// ----------     Query with pdf file     ---------------

const {OpenAI}= require('langchain/llms/openai');
const {Chroma}= require('langchain/vectorstores/chroma');
const {OpenAIEmbeddings}= require('langchain/embeddings/openai');
// const {PDFDocument}= require('langchain/document');
const {PDFDocument}= require('pdf-lib');
const {PDFLoader}= require('langchain/document_loaders/fs/pdf');
const {pdfparse}= require('pdf-parse');
const {fs}= require('fs/promises');
const { TextSplitter } = require('text_splitter');


async function mainFunc(){

   //initializing langchain
   const model= new OpenAI({openAIApiKey: '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' ,temperature:0});

   //initializing chromadb
   const chroma= new Chroma();

   //load pdf file from your pc
   const loader= new PDFLoader("C:\\Users\\Funavry\\Downloads\\cryptoBooks\\EthereumDummies.pdf")
   const pdfdata= await fs.readFile(loader)
const docs= await loader.load();


   //Extract texts from loaded pdf file
   const splitPdf= await TextSplitter(docs);
   const pdftext= await model.pdfparse(splitPdf);

   //Indexing to pdf document
   const doc={
    id: loader,
    title: docs.getTitle() ,
    content: pdftext.text

   }
   chroma.indexDocument(doc)

   //querying 
   const query= {
    content:"example"
   }
   const result= await Chroma.query(query);


   
const vectorStore = await Chroma.fromExistingCollection(
   new OpenAIEmbeddings(),
   { collectionName: "godel-escher-bach" }                    
 );
 
 const response = await vectorStore.similaritySearch("scared", 2);
 console.log(response);
    }




    
mainFunc()