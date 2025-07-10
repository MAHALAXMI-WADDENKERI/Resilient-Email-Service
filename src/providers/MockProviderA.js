module.exports = {
  name: 'ProviderA',
  send: async (email) => {
    if (Math.random() < 0.5) throw new Error('ProviderA failed');
    return { success: true };
  },
};