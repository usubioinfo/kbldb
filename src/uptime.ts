// For now, this will be a small script that measures the uptime of the
// tools on our server. Having tools randomly not being available is
// really annoying to keep track of, and I'd like to have a way of
// keeping track of uptime.
import Logger from '@config/logger';
const tools = [
  'PredHPI', 'AP-iNET', 'deepHPI', 'hucopia', 'Plant-mSubP', 'AtSubP', 'rslpred',
  'PLpred', 'NECminer', 'GreeningDB', 'citSATdb', 'legumeSSRdb', 'ranchSATdb',
  'lacsubpred', 'ligpred', 'rbpred'
];
