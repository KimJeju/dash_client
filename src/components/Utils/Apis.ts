const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const getToken = () => {
  if (typeof window !== 'undefined') {
    var accesstoken = window.sessionStorage.getItem('access_token');
    return accesstoken;
  }
};

const token = getToken() as string;

// area info
export async function GetAreaTotalAvg() {
  const response = await fetch(`${SERVER_URL}dash_area_info/area_total_avg`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetAreaTotalAvg API Call Has been complate');
    });
  return response;
}

export async function GetRegionVisitorTransition(zones: string[]) {
  let url = `${SERVER_URL}dash_area_info/get_region_visitor_transition?zones=${zones[0]}`;
  for (let i = 1; i < zones.length; ++i) {
    url = url + `&zones=${zones[i]}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetRegionVisitorTransition API Call Has been complate');
    });
  return response;
}

export async function GetRegionReVisitorTransition(zones: string[]) {
  let url = `${SERVER_URL}dash_area_info/get_region_revisitor_transition?zones=${zones[0]}`;
  for (let i = 1; i < zones.length; ++i) {
    url = url + `&zones=${zones[i]}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetRegionReVisitorTransition API Call Has been complate');
    });
  return response;
}

export async function GetCurrentVisitPeople(zones: string[]) {
  let url = `${SERVER_URL}dash_area_info/get_region_cuurent_people?zones=${zones[0]}`;
  for (let i = 1; i < zones.length; ++i) {
    url = url + `&zones=${zones[i]}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetCurrentVisitPeople API Call Has been complate');
    });
  return response;
}

export async function GetAreaSubtotalList(zones: string[]) {
  let url = `${SERVER_URL}dash_area_info/area_subtotal_list?zones=${zones[0]}`;
  for (let i = 1; i < zones.length; ++i) {
    url = url + `&zones=${zones[i]}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetAreaSubtotalList API Call Has been complate');
    });
  return response;
}

// total
export async function GetCurrentAvgTotalValue(from: string, to: string, find_key: string) {
  const response = await fetch(
    `${SERVER_URL}total_analysis/current_average_total_value?from=${from}&to=${to}&find_key=${find_key}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetCurrentAvgTotalValue API Call Has been complate');
    });
  return response;
}

export async function GetZoneAvgChartValue(zones: string[]) {
  let url = `${SERVER_URL}total_analysis/zone_average_chart_value?zones=${zones[0]}`;
  for (let i = 1; i < zones.length; ++i) {
    url = url + `&zones=${zones[i]}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetZoneAvgChartValue API Call Has been complate');
    });

  return response;
}

export async function GetDiffAvgZoneValue(from: string) {
  let url = `${SERVER_URL}diff_analysis/diff_average_zone_value?date_from=${from}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetDiffAvgZoneValue API Call Has been complate');
    });

  return response;
}

export async function GetTotalFloatPopulation(from: string, to: string, find_key: string) {
  let url = `${SERVER_URL}diff_analysis/total_floatpopulation?find_key=${find_key}&date_from=${from}&date_to=${to}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetTotalFloatPopulation API Call Has been complate');
    });

  return response;
}

export async function GetRangePopularAllList(from: string, to: string) {
  let url = `${SERVER_URL}diff_analysis/range_popular_all_list?date_from=${from}&date_to=${to}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log('GetRangePopularAllList API Call Has been complate');
    });

  return response;
}

//login
export const LoginRequest = async (email: string, password: string) => {
  const token = getToken() as string;
  const response = await fetch(`${SERVER_URL}user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
    body: JSON.stringify({
      userid: email,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      return e;
    })
    .finally(() => {
      console.log('GetAreaTotalAvg API Call Has been complate');
    });
  return response;
};

export const signUpRequest = async (userId: string, userName: string, password: string) => {
  const response = await fetch(`${SERVER_URL}user/signup`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      userid: userId,
      username: userName,
      password: password,
    })
  })
  .then((response) => {
    return response.json();
  })
  .catch((e) => {
    return e;
  })
  return response;
}

// Scanner Info
export const GetAllCultureScanners = async () => {
  const response = await fetch(`${SERVER_URL}dash_area_info/get_all_culture_scanners`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
  return response;
};

export const GetAllCultureZones = async () => {
  const response = await fetch(`${SERVER_URL}dash_area_info/get_all_culture_zones`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
  return response;
};

export const GetAllCulturePolygon = async () => {
  const response = await fetch(`${SERVER_URL}dash_area_info/get_all_culture_polygon`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
  return response;
};
