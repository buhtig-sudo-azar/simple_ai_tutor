//analysisApi.js


import apiClient from './apiClient';

export const analysisApi = {
  analyzeText: (text) => 
    apiClient.post('/api/analyze', { text }),
  
  // TODO: добавить другие методы позже
};