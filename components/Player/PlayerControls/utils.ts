const padTime = (value: number) => {
    const str = value.toString();
  
    return str.length === 1 ? `0${str}` : str;
  };
  
  export const formatTime = (seconds: number) => {
    const int = Math.floor(seconds / 60);
    const decimal = Math.floor(seconds % 60);
  
    return `${int}:${padTime(decimal)}`;
  };
  