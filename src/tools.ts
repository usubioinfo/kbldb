export const tools: {name: string, link: string, availability: string}[] = [
  {
    name: 'legumeSSRdb',
    link: 'http://bioinfo.usu.edu/legumeSSRdb',
    availability: ''
  },
  {
    name: 'citSATdb',
    link: 'http://bioinfo.usu.edu/citSATdb',
    availability: ''
  },
  {
    name: 'PredHPI',
    link: 'http://bioinfo.usu.edu/PredHPI/',
    availability: ''
  },
  {
    name: 'alfaNET',
    link: 'http://bioinfo.usu.edu/alfanet/',
    availability: ''
  },
  {
    name: 'WeCoNET',
    link: 'http://bioinfo.usu.edu/weconet/',
    availability: ''
  },
  {
    name: 'AP-iNET',
    link: 'http://bioinfo.usu.edu/AP-iNET',
    availability: ''
  },
  {
    name: 'deepHPI',
    link: 'http://bioinfo.usu.edu/deepHPI/',
    availability: ''
  },
  {
    name: 'HuCoPIA',
    link: 'http://bioinfo.usu.edu/hucopia/',
    availability: ''
  },
  {
    name: 'Plant-mSubP',
    link: 'http://bioinfo.usu.edu/Plant-mSubP',
    availability: ''
  },
  {
    name: 'AtSubP',
    link: 'http://bioinfo3.noble.org/AtSubP/',
    availability: ''
  },
  {
    name: 'RSLpredP',
    link: 'https://webs.iiitd.edu.in/raghava/rslpred/',
    availability: ''
  },
  {
    name: 'PLpred',
    link: 'http://bioinfo.usu.edu/PLpred',
    availability: ''
  },
  {
    name: 'deepNEC',
    link: 'http://bioinfo.usu.edu/deepNEC/',
    availability: ''
  },
  {
    name: 'GreeningDB',
    link: 'http://bioinfo.usu.edu/GreeningDB/',
    availability: ''
  },
  {
    name: 'ranchSATdb',
    link: 'http://bioinfo.usu.edu/ranchSATdb/',
    availability: ''
  },
  {
    name: 'LacSubPred',
    link: 'http://bioinfo.usu.edu/lacsubpred',
    availability: ''
  },
  {
    name: 'LigPred',
    link: 'http://bioinfo.usu.edu/ligpred',
    availability: ''
  },
  {
    name: 'RBPred',
    link: 'https://webs.iiitd.edu.in/raghava/rbpred/',
    availability: ''
  }
];

export const toolNames = tools.map(tool => {
  return tool.name;
})

// avail types: running, slow, down
