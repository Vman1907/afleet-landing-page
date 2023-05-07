import ReactGA from 'react-ga';

 export const Event = (category: any, action: any, label: any) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};
