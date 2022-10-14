export const generateRevisionId = () => {
  let r = (Math.random() + 1).toString(36).substring(2);
  return r
}

export default generateRevisionId