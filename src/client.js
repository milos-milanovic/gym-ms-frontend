const axios = require('axios');

/* ----- MEMBERS ---- */
export const fetchAllMembers = () => axios.get('/api/gymms/members');

export const fetchMemberById = (id) => axios.get(`/api/gymms/members/${id}`);

export const fetchMemberByEmail = (email) => axios.get(`/api/gymms/members/email/${email}`);

export const searchMember = (input) =>
  axios.get('/api/gymms/members/search', {
    params: {
      q: input,
    },
  });

export const addNewMember = (member) =>
  axios.post('/api/gymms/members', JSON.stringify(member), {
    headers: { 'Content-Type': 'application/json' },
  });

export const editMember = (member) =>
  axios.put('/api/gymms/members', JSON.stringify(member), {
    headers: { 'Content-Type': 'application/json' },
  });

/* ----- GIFT CODES ---- */
export const checkGiftCode = (code) => axios.get('/api/gymms/gift-code/check', { params: { code } });

export const redeemGiftCodeToMemberId = (code, memberId) =>
  axios.put('/api/gymms/gift-code/redeem', JSON.stringify({ code, memberId }), {
    headers: { 'Content-Type': 'application/json' },
  });

export const generateGiftCode = (email) =>
  axios.post('/api/gymms/gift-code/generate', email, {
    headers: { 'Content-Type': 'text/plain' },
  });
