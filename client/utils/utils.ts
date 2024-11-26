// time formatter for react time ago.
export   const customFormatter = (value: number, unit: string, suffix: string) => {
    const shortUnit = {
      second: "s",
      minute: "m",
      hour: "h",
      day: "d",
      week: "w",
      month: "m",
      year: "y",
    }[unit];
    return `${value}${shortUnit}`;
  };