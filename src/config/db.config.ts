import dotenv from 'dotenv';
dotenv.config();

let dbConfig: {adminSecret: string, database: string, secret: string};

if (process.env.NODE_ENV === 'DEVTEST') {
  dbConfig = {
    adminSecret: 'WWxx3h9TJVuHLBa2ERmwpO9Q6PMVrZqDy29rKvu05PhZg',
    database: 'mongodb://localhost:27017/kbldev',
    secret: 'Ve8lpivm7Phf3FfcUkr5STfPeW7mCbbHPUELyGJOki8JDtun'
  };
} else if (process.env.NODE_ENV === 'development') {
  dbConfig = {
    adminSecret: 'XO1NplKTIhw91IP2YyvskUJCqip3bGpb0I7wMOt',
    database: 'mongodb://localhost:27017/kbltest',
    secret: 'bD7gJaSwrytxmhBQUi4KzEC2Rxyxe7Ld3RAXdFTEdU'
  };
} else {
  dbConfig = {
    adminSecret: 'BhiX3RStqog3xUiF7pkuCvKHM4Y7NB4X542gb<as',
    database: 'mongodb://localhost:27017/kbl',
    secret: 'GCuhLJ4FDCvxiNDhT4SFyhYODRLZmyc1QptyH6g8t'
  };
}

export { dbConfig };
