interface IRange {
  ammo: number[];
  dist_5: number;
  dist_10: number;
  dist_15: number;
  dist_20: number;
  dist_25: number;
  dist_30: number;
  dist_35: number;
  dist_40: number;
  dist_45: number;
  dist_50: number;
  dist_60: number;
  dist_70: number;
  dist_80: number;
  dist_90: number;
  dist_100: number;
  dist_150: number;
  dist_200: number;
  dist_250: number;
  id: number;
}

interface IAmmo {
  capacity_magazine: number;
  capacity_spare: number;
  damage: number;
  damage_range: IRange[];
  effectiverange: number;
  id: number;
  muzzle_velocity: number;
  price_ammo: number;
  type: string;
  verticalrecoil: number;
  weapon: number[];
}

interface IWeapon {
  ammo: IAmmo[];
  category: string;
  cost: number;
  cycletime: number;
  description: string;
  heavymeleedamage: number;
  id: number;
  meleedamage: number;
  name: string;
  price: number;
  rateoffire: number;
  reloadspeed: number;
  spread: number;
  staminaconsumption: number;
  sway: number;
  weapon_image: string;
}

export async function fetchWeapons() {
  return fetch(
    "https://port-0-huntshowdown-damage-cal-back-2rrqq2blmygo1x3.sel5.cloudtype.app/api/weapon/"
  ).then((response) =>
    response.json().then((json) =>
      json.sort((a: IWeapon, b: IWeapon) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
    )
  );
}
