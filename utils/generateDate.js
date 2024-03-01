// Fonction pour generer la date
const theDate = () => {
  const today = new Date();
  const thisDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}  ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return thisDate;
};

export default theDate;
