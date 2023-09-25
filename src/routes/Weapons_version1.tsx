import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeapons } from "../api";
import { clearTimeout } from "timers";

const Container = styled.div`
  width: 920px;
  margin: 20px auto;
`;

const WeaponSelectContainer = styled.div`
  margin-bottom: 20px;
`;

const WeaponSelectBox = styled.div`
  border: 1px solid #ffeaa7;
`;

const SortTitleBox = styled.div`
  font-size: 32px;
  border: 1px solid #fab1a0;
`;

const SortWeaponBox = styled.ul`
  padding: 10px;
  display: flex;
  border: 1px solid #ff7675;
`;

const WeaponBox = styled.li`
  width: 18%;
  height: 100%;
  margin-right: 10px;
  div {
    position: relative;
    width: 100%;
    min-width: 40px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(50, 50);
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      margin: auto;
    }
  }
  p {
    text-align: center;
  }
  border: 1px solid #fd79a8;
`;

interface IAmmoSelector {
  $posx: number;
  $posy: number;
}

const AmmoSelector = styled.ul<IAmmoSelector>`
  position: absolute;
  top: ${(props) => props.$posy}px;
  left: ${(props) => props.$posx}px;
  width: 240px;
  background-color: #fff;
  border: 1px solid #ccc;
  transform: translate(-30%, -30%);
  padding: 10px;
`;

const AmmoOption = styled.li`
  padding: 5px;
`;

const WeaponCompareContainer = styled.div`
  border: 1px solid #ffeaa7;
`;

const WeaponShowBox = styled.div`
  display: flex;
  div {
    position: relative;
    width: 100%;
    min-height: 100px;
    border: 1px solid #fab1a0;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(50, 50);
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      margin: auto;
    }
  }
`;

const SelectedWeaponBox = styled.div`
  border: 1px solid #fdcb6e;
  width: 50%;
`;

const CompareBox = styled.div`
  display: flex;
`;

const CompareCol = styled.ul`
  width: 50%;
  text-align: center;
`;

const CompareRow = styled.li`
  display: flex;
  margin-top: 5px;
`;

const CompareItemDiff = styled.p`
  width: 10%;
`;

const CompareItemValue = styled.p`
  width: 20%;
`;

const CompareItem = styled.p`
  width: 40%;
`;

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

function Weapons() {
  const AMMOTYPES: string[] = [
    "compact",
    "medium",
    "long",
    "shotgun",
    "special",
  ];
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleWindowMouseMove = (event: any) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("click", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);
  const { isLoading, data } = useQuery<IWeapon[]>(["allWeapons"], fetchWeapons);
  const isErr = !Array.isArray(data);
  const [selectedL, setSelectedL] = useState<string | null>(null);
  const [selectedLAmmoType, setSelectedLAmmoType] = useState<string | null>(
    null
  );
  const [isAmmoSelectorOpen, setIsAmmoSelectorOpen] = useState(false);
  const [selectedR, setSelectedR] = useState<string | null>(null);
  const [selectedRAmmoType, setSelectedRAmmoType] = useState<string | null>(
    null
  );
  const [isSelectorL, setIsSelectorL] = useState<boolean>(true);
  useEffect(() => {
    if (selectedL !== null && selectedLAmmoType !== null) {
      setIsSelectorL(false);
    } else {
      setIsSelectorL(true);
    }
  }, [selectedL, selectedLAmmoType]);
  const onClickWeaponBox = (event: React.MouseEvent<HTMLElement>) => {
    const selectedWeaponName = (
      event.currentTarget.querySelector("p") as HTMLElement
    )?.textContent;

    const selectedWeapon = data?.find(
      (weapon) => weapon.name === selectedWeaponName
    );
    if (selectedWeapon) {
      // Get the ammo types of the selected weapon
      const ammoTypes = selectedWeapon.ammo.map((ammo) => ammo.type);
      // Set the first ammo type as the default selection
      if (isSelectorL) {
        // setSelectedLAmmoType(ammoTypes[0]);
        setSelectedL(selectedWeaponName);
      } else {
        // setSelectedRAmmoType(ammoTypes[0]);
        setSelectedR(selectedWeaponName);
      }
      setIsAmmoSelectorOpen(true);
    }
  };
  const lCost = data?.find((w) => w.name === selectedL)?.cost;

  return (
    <Container>
      {isLoading ? (
        "Loading Data"
      ) : isErr ? (
        "Cannot Load Data"
      ) : (
        <>
          <h1>
            Data has been loaded! {selectedL} {selectedLAmmoType} {coords.x}{" "}
            {coords.y} {isAmmoSelectorOpen} {isSelectorL}
          </h1>
          <WeaponSelectContainer>
            <WeaponSelectBox>
              {AMMOTYPES.map((AMMO, index) => (
                <div key={index}>
                  <SortTitleBox>{AMMO}</SortTitleBox>
                  <SortWeaponBox>
                    {data.map((weapon) => {
                      if (weapon.category == AMMO) {
                        return (
                          <WeaponBox
                            key={weapon.name}
                            onClick={onClickWeaponBox}
                          >
                            <div>
                              {weapon.weapon_image ? (
                                <img
                                  src={weapon.weapon_image}
                                  alt={weapon.name}
                                />
                              ) : null}
                            </div>
                            <p>{weapon.name}</p>
                          </WeaponBox>
                        );
                      }
                    })}
                  </SortWeaponBox>
                </div>
              ))}
            </WeaponSelectBox>
            {isAmmoSelectorOpen && (
              <AmmoSelector
                $posx={coords.x}
                $posy={coords.y}
                onMouseLeave={() => {
                  setIsAmmoSelectorOpen(false);
                }}
              >
                {isSelectorL
                  ? data.map((weapon) =>
                      weapon.name === selectedL
                        ? weapon.ammo.map((ammo) => (
                            <AmmoOption
                              key={ammo.id}
                              onClick={() => {
                                setSelectedLAmmoType(ammo.type);
                                setIsAmmoSelectorOpen(false);
                              }}
                            >
                              {ammo.type}
                            </AmmoOption>
                          ))
                        : null
                    )
                  : data.map((weapon) =>
                      weapon.name === selectedR
                        ? weapon.ammo.map((ammo) => (
                            <AmmoOption
                              key={ammo.id}
                              onClick={() => {
                                setSelectedRAmmoType(ammo.type);
                                setIsAmmoSelectorOpen(false);
                              }}
                            >
                              {ammo.type}
                            </AmmoOption>
                          ))
                        : null
                    )}
              </AmmoSelector>
            )}
          </WeaponSelectContainer>
          <WeaponCompareContainer>
            <WeaponShowBox>
              <SelectedWeaponBox>
                <h2>{selectedL}</h2>
                {data.map((weapon) => {
                  if (weapon.name == selectedL) {
                    return (
                      <div>
                        <img src={weapon.weapon_image} alt={weapon.name} />
                      </div>
                    );
                  }
                })}
                <ul>
                  {selectedL
                    ? data.map((weapon) =>
                        weapon.name === selectedL
                          ? weapon.ammo.map((ammo) => <li>{ammo.type}</li>)
                          : null
                      )
                    : null}
                </ul>
              </SelectedWeaponBox>
              <SelectedWeaponBox>
                <h2>{selectedR}</h2>
                {data.map((weapon) => {
                  if (weapon.name == selectedR) {
                    return (
                      <div>
                        {weapon.weapon_image ? (
                          <img src={weapon.weapon_image} alt={weapon.name} />
                        ) : null}
                      </div>
                    );
                  }
                })}
                <ul>
                  {selectedR
                    ? data.map((weapon) =>
                        weapon.name === selectedR
                          ? weapon.ammo.map((ammo) => <li>{ammo.type}</li>)
                          : null
                      )
                    : null}
                </ul>
              </SelectedWeaponBox>
            </WeaponShowBox>
            <CompareBox>
              <CompareCol>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.cost
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Cost</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.cost
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.capacity_magazine
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Weapon Capacity</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.capacity_magazine
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.capacity_spare
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Spare Capacity</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.capacity_spare
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.damage
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Damage</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.damage
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.effectiverange
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Effective Range</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.effectiverange
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.muzzle_velocity
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Muzzle Velocity</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.muzzle_velocity
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.rateoffire
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Rate of Fire</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.rateoffire
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.reloadspeed
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Reload Speed</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.reloadspeed
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.cycletime
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Cycle Time</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.cycletime
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
              </CompareCol>
              <CompareCol>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.spread
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Spread</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.spread
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.sway
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Sway</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.sway
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.verticalrecoil
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Vertical Recoil</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.verticalrecoil
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.meleedamage
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Melee Damage</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.meleedamage
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.heavymeleedamage
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Heavy Melee Damage</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.heavymeleedamage
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)
                          ?.staminaconsumption
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Stamina Consumption</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)
                          ?.staminaconsumption
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? data.find((w) => w.name === selectedL)?.price
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Weapon Price</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? data.find((w) => w.name === selectedR)?.price
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.price_ammo
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Ammo Price</CompareItem>
                  <CompareItemValue>
                    {selectedR
                      ? selectedRAmmoType
                        ? data
                            ?.find((w) => w.name === selectedR)
                            ?.ammo.find((a) => a.type === selectedRAmmoType)
                            ?.price_ammo
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
                <CompareRow>
                  <CompareItemDiff>-</CompareItemDiff>
                  <CompareItemValue>
                    {selectedL
                      ? selectedLAmmoType
                        ? data
                            ?.find((w) => w.name === selectedL)
                            ?.ammo.find((a) => a.type === selectedLAmmoType)
                            ?.price_ammo
                        : "-"
                      : "-"}
                  </CompareItemValue>
                  <CompareItem>Total Price</CompareItem>
                  <CompareItemValue>14</CompareItemValue>
                  <CompareItemDiff>-</CompareItemDiff>
                </CompareRow>
              </CompareCol>
            </CompareBox>
          </WeaponCompareContainer>

          <h2
            onClick={() => {
              setSelectedL(null);
              setSelectedLAmmoType(null);
            }}
          >
            왼쪽 {selectedL} {selectedLAmmoType}
          </h2>
          <h2
            onClick={() => {
              setSelectedR(null);
              setSelectedRAmmoType(null);
            }}
          >
            오른쪽 {selectedR} {selectedRAmmoType}
          </h2>
        </>
      )}
    </Container>
  );
}

export default Weapons;
