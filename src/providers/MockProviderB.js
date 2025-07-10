module.exports = {
  name: 'ProviderB',
  send: async (email) => {
    if (Math.random() < 0.5) throw new Error('ProviderB failed');
    return { success: true };
  },
};