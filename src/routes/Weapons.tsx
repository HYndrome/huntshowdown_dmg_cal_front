import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeapons } from "../api";
import {
  GoodIsGoodL,
  GoodIsGoodR,
  BadIsGoodL,
  BadIsGoodR,
} from "../components/WeaponCompareComponents";
import DamageRangeChart from "../components/DamageRangeChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OutContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 100px);
`;

const Title = styled.h1`
  font-family: "GT Sectra Fine Medium", serif;
  @media (min-width: 1400px) {
    font-size: 50px;
  }
  font-size: 40px;
  margin-bottom: 30px;
`;

const WeaponSelectContainer = styled.div`
  margin-bottom: 20px;
`;

const WeaponSelectBox = styled.div``;

const SortTitleBox = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-family: "GT Sectra Fine Medium", serif;
  color: ${(props) => props.theme.textStrongColor};
  background-color: ${(props) => props.theme.box1Color};
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.selectableColor};
  }
`;

const SortWeaponBox = styled.ul`
  padding: 10px;
  font-size: 10px;
  background-color: ${(props) => props.theme.box2Color};
`;

const WeaponBox = styled.li`
  display: inline-block;
  width: 18%;
  min-height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.textStrongColor};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.box2Color};
    background-color: ${(props) => props.theme.selectableColor};
  }
  div {
    position: relative;
    width: 100%;
    min-width: 40px;
    height: 50px;
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
`;

const WeaponBoxL = styled.li`
  display: inline-block;
  width: 18%;
  min-height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.select1Color};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.box2Color};
    background-color: ${(props) => props.theme.select1StrongColor};
  }
  div {
    position: relative;
    width: 100%;
    min-width: 40px;
    height: 50px;
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
    color: ${(props) => props.theme.textStrongColor};
  }
`;

const WeaponBoxR = styled.li`
  display: inline-block;
  width: 18%;
  min-height: 80px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.select2Color};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.box2Color};
    background-color: ${(props) => props.theme.select2StrongColor};
  }
  div {
    position: relative;
    width: 100%;
    min-width: 40px;
    height: 50px;
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
    color: ${(props) => props.theme.textStrongColor};
  }
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
  background-color: ${(props) => props.theme.box1Color};
  color: ${(props) => props.theme.textStrongColor};
  border: 1px solid #ccc;
  transform: translate(-30%, -30%);
  padding: 4px;
  opacity: 0.9;
`;

const AmmoOption = styled.li`
  padding: 5px;
  z-index: -100;
  &:hover {
    background-color: ${(props) => props.theme.selectableColor};
    cursor: pointer;
  }
`;

const WeaponCompareContainer = styled.div`
  margin-bottom: 20px;
`;

const WeaponShowBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectedWeaponBox = styled.div`
  background-color: ${(props) => props.theme.box1Color};
  width: 49%;
  h2 {
    color: ${(props) => props.theme.textStrongColor};
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    font-family: "GT Sectra Fine Medium", serif;
    margin: 3px 0;
  }
`;

const NoSelectedWeaponImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100px;
  background-color: ${(props) => props.theme.box2Color};
`;

const SelectedWeaponImgContainerL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100px;
  background-color: ${(props) => props.theme.select1Color};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.select1StrongColor};
  }
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
`;

const SelectedWeaponImgContainerR = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100px;
  background-color: ${(props) => props.theme.select2Color};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.select2StrongColor};
  }
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
`;

const SelectedAmmoBox = styled.div`
  width: 100%;
  ul {
    min-height: 70px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
`;

const UnselectedAmmo = styled.li`
  background-color: ${(props) => props.theme.box2Color};
  color: ${(props) => props.theme.textStrongColor};
  font-family: "GT Sectra Fine Medium", serif;

  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px;
  padding: 7px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.selectableColor};
  }
`;

const SelectedAmmoL = styled.li`
  background-color: ${(props) => props.theme.select1Color};
  color: ${(props) => props.theme.box2Color};
  font-family: "GT Sectra Fine Medium", serif;

  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px;
  padding: 7px;
  border-radius: 4px;
`;

const SelectedAmmoR = styled.li`
  background-color: ${(props) => props.theme.select2Color};
  color: ${(props) => props.theme.box2Color};
  font-family: "GT Sectra Fine Medium", serif;

  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px;
  padding: 7px;
  border-radius: 4px;
`;

const CompareBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.box2Color};
`;

const CompareCol = styled.ul`
  width: 49%;
  text-align: center;
`;

const CompareRow = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  padding: 5px;
  height: 35px;
`;

const CompareItemValue = styled.p`
  color: ${(props) => props.theme.textStrongColor};
  width: 20%;
`;

const CompareItem = styled.p`
  font-size: 13px;
  width: 40%;
`;

const ChartContainer = styled.div`
  position: relative;
  padding: 5px;
  border: 8px solid ${(props) => props.theme.box1Color};
  min-height: 410px;
  background-color: white;
  p {
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const Footer = styled.div`
  font-family: "GT Sectra Fine Medium", serif;
  text-align: center;
  border-top: 1px solid ${(props) => props.theme.box1Color};
  padding: 10px;
  h3 {
    font-size: 20px;
    color: ${(props) => props.theme.textStrongColor};
    margin-bottom: 10px;
  }
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

interface IIsDropBoxDown {
  compact: boolean;
  medium: boolean;
  long: boolean;
  shotgun: boolean;
  special: boolean;
  [key: string]: boolean;
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
        x: event.pageX,
        y: event.pageY,
      });
    };
    window.addEventListener("click", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);
  const { isLoading, data } = useQuery<IWeapon[]>(["allWeapons"], fetchWeapons);
  const isErr = !Array.isArray(data);
  const [selectedL, setSelectedL] = useState<IWeapon | null>(null);
  const [selectedLAmmoType, setSelectedLAmmoType] = useState<IAmmo | null>(
    null
  );
  const [isAmmoSelectorOpen, setIsAmmoSelectorOpen] = useState(false);
  const [selectedR, setSelectedR] = useState<IWeapon | null>(null);
  const [selectedRAmmoType, setSelectedRAmmoType] = useState<IAmmo | null>(
    null
  );
  const [isSelectorL, setIsSelectorL] = useState<boolean>(true);
  const [isDropBoxDown, setIsDropBoxDown] = useState<IIsDropBoxDown>({
    compact: true,
    medium: false,
    long: false,
    shotgun: false,
    special: false,
  });
  useEffect(() => {
    if (selectedL !== null && selectedLAmmoType !== null) {
      setIsSelectorL(false);
    } else {
      setIsSelectorL(true);
    }
  }, [selectedL, selectedLAmmoType]);

  useEffect(() => {
    setSelectedLAmmoType(null);
  }, [selectedL]);
  useEffect(() => {
    setSelectedRAmmoType(null);
  }, [selectedR]);

  const onClickWeaponBox = (event: React.MouseEvent<HTMLElement>) => {
    const selectedWeaponName = (
      event.currentTarget.querySelector("p") as HTMLElement
    )?.textContent;

    const selectedWeapon = data?.find(
      (weapon) => weapon.name === selectedWeaponName
    );
    if (selectedWeapon) {
      // Get the ammo types of the selected weapon
      // Set the first ammo type as the default selection
      if (isSelectorL) {
        // setSelectedLAmmoType(ammoTypes[0]);
        setSelectedL(selectedWeapon);
      } else {
        // setSelectedRAmmoType(ammoTypes[0]);
        setSelectedR(selectedWeapon);
      }
      setIsAmmoSelectorOpen(true);
    }
  };

  return (
    <>
      <OutContainer>
        <Title>HYndrome's Huntshowdown Damage Calculator</Title>
        {isLoading ? (
          "Loading Data"
        ) : isErr ? (
          "Cannot Load Data"
        ) : (
          <Container>
            <Row>
              <Col xs={12} xxl={6}>
                <WeaponSelectContainer>
                  <WeaponSelectBox>
                    {AMMOTYPES.map((AMMO, index) => {
                      if (isDropBoxDown[AMMO]) {
                        return (
                          <div key={index}>
                            <SortTitleBox
                              onClick={() => {
                                setIsDropBoxDown((preState) => ({
                                  ...preState,
                                  [AMMO]: false,
                                }));
                              }}
                            >
                              <p>{AMMO.toUpperCase()}</p>
                              <i className="bi bi-caret-down"></i>
                            </SortTitleBox>
                            <SortWeaponBox>
                              {data.map((weapon) => {
                                if (weapon.category === AMMO) {
                                  if (weapon.name === selectedL?.name) {
                                    return (
                                      <WeaponBoxL
                                        key={weapon.name}
                                        onClick={() => {
                                          setSelectedL(null);
                                        }}
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
                                      </WeaponBoxL>
                                    );
                                  } else if (weapon.name === selectedR?.name) {
                                    return (
                                      <WeaponBoxR
                                        key={weapon.name}
                                        onClick={() => {
                                          setSelectedR(null);
                                        }}
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
                                      </WeaponBoxR>
                                    );
                                  } else {
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
                                } else {
                                  return null;
                                }
                              })}
                            </SortWeaponBox>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index}>
                            <SortTitleBox
                              onClick={() => {
                                setIsDropBoxDown((preState) => ({
                                  ...preState,
                                  [AMMO]: true,
                                }));
                              }}
                            >
                              <p>{AMMO.toUpperCase()}</p>
                              <i className="bi bi-caret-down-fill"></i>
                            </SortTitleBox>
                          </div>
                        );
                      }
                    })}
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
                        ? selectedL
                          ? selectedL.ammo.map((a) => (
                              <AmmoOption
                                key={a.id}
                                onClick={() => {
                                  setSelectedLAmmoType(a);
                                  setIsAmmoSelectorOpen(false);
                                }}
                              >
                                {a.type}
                              </AmmoOption>
                            ))
                          : null
                        : selectedR
                        ? selectedR.ammo.map((a) => (
                            <AmmoOption
                              key={a.id}
                              onClick={() => {
                                setSelectedRAmmoType(a);
                                setIsAmmoSelectorOpen(false);
                              }}
                            >
                              {a.type}
                            </AmmoOption>
                          ))
                        : null}
                    </AmmoSelector>
                  )}
                </WeaponSelectContainer>
              </Col>
              <Col xs={12} xxl={6}>
                <WeaponCompareContainer>
                  <WeaponShowBox>
                    <SelectedWeaponBox>
                      <h2>{selectedL?.name ? selectedL?.name : "Left"}</h2>
                      {selectedL ? (
                        <SelectedWeaponImgContainerL
                          onClick={() => {
                            setSelectedL(null);
                            setSelectedLAmmoType(null);
                          }}
                        >
                          {selectedL?.weapon_image ? (
                            <img
                              src={selectedL?.weapon_image}
                              alt={selectedL?.name}
                            />
                          ) : (
                            <p>No img</p>
                          )}
                        </SelectedWeaponImgContainerL>
                      ) : (
                        <NoSelectedWeaponImgContainer>
                          <p>Select weapon</p>
                        </NoSelectedWeaponImgContainer>
                      )}
                      <SelectedAmmoBox>
                        <ul>
                          {selectedL
                            ? selectedL.ammo.map((a) => {
                                if (a.type === selectedLAmmoType?.type) {
                                  return (
                                    <SelectedAmmoL key={a.type}>
                                      {a.type}
                                    </SelectedAmmoL>
                                  );
                                } else {
                                  return (
                                    <UnselectedAmmo
                                      key={a.type}
                                      onClick={() => {
                                        setSelectedLAmmoType(a);
                                      }}
                                    >
                                      {a.type}
                                    </UnselectedAmmo>
                                  );
                                }
                              })
                            : null}
                        </ul>
                      </SelectedAmmoBox>
                    </SelectedWeaponBox>
                    <SelectedWeaponBox>
                      <h2>{selectedR?.name ? selectedR?.name : "Right"}</h2>
                      {selectedR ? (
                        <SelectedWeaponImgContainerR
                          onClick={() => {
                            setSelectedR(null);
                            setSelectedRAmmoType(null);
                          }}
                        >
                          {selectedR?.weapon_image ? (
                            <img
                              src={selectedR?.weapon_image}
                              alt={selectedR?.name}
                            />
                          ) : (
                            <p>No img</p>
                          )}
                        </SelectedWeaponImgContainerR>
                      ) : (
                        <NoSelectedWeaponImgContainer>
                          <p>Select weapon</p>
                        </NoSelectedWeaponImgContainer>
                      )}
                      <SelectedAmmoBox>
                        <ul>
                          {selectedR
                            ? selectedR.ammo.map((a) => {
                                if (a.type === selectedRAmmoType?.type) {
                                  return (
                                    <SelectedAmmoR key={a.type}>
                                      {a.type}
                                    </SelectedAmmoR>
                                  );
                                } else {
                                  return (
                                    <UnselectedAmmo
                                      key={a.type}
                                      onClick={() => {
                                        setSelectedRAmmoType(a);
                                      }}
                                    >
                                      {a.type}
                                    </UnselectedAmmo>
                                  );
                                }
                              })
                            : null}
                        </ul>
                      </SelectedAmmoBox>
                    </SelectedWeaponBox>
                  </WeaponShowBox>
                  <CompareBox>
                    <CompareCol>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.cost}
                          right={selectedR?.cost}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.cost : "-"}
                        </CompareItemValue>
                        <CompareItem>Cost</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.cost : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.cost}
                          right={selectedR?.cost}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedLAmmoType?.capacity_magazine}
                          right={selectedRAmmoType?.capacity_magazine}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.capacity_magazine
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Weapon Capacity</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.capacity_magazine
                            : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedLAmmoType?.capacity_magazine}
                          right={selectedRAmmoType?.capacity_magazine}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedLAmmoType?.capacity_spare}
                          right={selectedRAmmoType?.capacity_spare}
                        ></GoodIsGoodL>
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.capacity_spare
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Spare Capacity</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.capacity_spare
                            : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedLAmmoType?.capacity_spare}
                          right={selectedRAmmoType?.capacity_spare}
                        ></GoodIsGoodR>
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedLAmmoType?.damage}
                          right={selectedRAmmoType?.damage}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType ? selectedLAmmoType.damage : "-"}
                        </CompareItemValue>
                        <CompareItem>Damage</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType ? selectedRAmmoType.damage : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedLAmmoType?.damage}
                          right={selectedRAmmoType?.damage}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedLAmmoType?.effectiverange}
                          right={selectedRAmmoType?.effectiverange}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.effectiverange
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Effective Range</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.effectiverange
                            : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedLAmmoType?.effectiverange}
                          right={selectedRAmmoType?.effectiverange}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedLAmmoType?.muzzle_velocity}
                          right={selectedRAmmoType?.muzzle_velocity}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.muzzle_velocity
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Muzzle Velocity</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.muzzle_velocity
                            : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedLAmmoType?.muzzle_velocity}
                          right={selectedRAmmoType?.muzzle_velocity}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.cycletime}
                          right={selectedR?.cycletime}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.cycletime : "-"}
                        </CompareItemValue>
                        <CompareItem>Cycle Time</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.cycletime : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.cycletime}
                          right={selectedR?.cycletime}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.reloadspeed}
                          right={selectedR?.reloadspeed}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.reloadspeed : "-"}
                        </CompareItemValue>
                        <CompareItem>Reload Speed</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.reloadspeed : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.reloadspeed}
                          right={selectedR?.reloadspeed}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedL?.rateoffire}
                          right={selectedR?.rateoffire}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.rateoffire : "-"}
                        </CompareItemValue>
                        <CompareItem>Rate of Fire</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.rateoffire : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedL?.rateoffire}
                          right={selectedR?.rateoffire}
                        />{" "}
                      </CompareRow>
                    </CompareCol>
                    <CompareCol>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.spread}
                          right={selectedR?.spread}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.spread : "-"}
                        </CompareItemValue>
                        <CompareItem>Spread</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.spread : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.spread}
                          right={selectedR?.spread}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.sway}
                          right={selectedR?.sway}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.sway : "-"}
                        </CompareItemValue>
                        <CompareItem>Sway</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.sway : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.sway}
                          right={selectedR?.sway}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedLAmmoType?.verticalrecoil}
                          right={selectedRAmmoType?.verticalrecoil}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.verticalrecoil
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Vertical Recoil</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.verticalrecoil
                            : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedLAmmoType?.verticalrecoil}
                          right={selectedRAmmoType?.verticalrecoil}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedL?.meleedamage}
                          right={selectedR?.meleedamage}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.meleedamage : "-"}
                        </CompareItemValue>
                        <CompareItem>Melee Damage</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.meleedamage : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedL?.meleedamage}
                          right={selectedR?.meleedamage}
                        />
                      </CompareRow>
                      <CompareRow>
                        <GoodIsGoodL
                          left={selectedL?.heavymeleedamage}
                          right={selectedR?.heavymeleedamage}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.heavymeleedamage : "-"}
                        </CompareItemValue>
                        <CompareItem>Heavy Melee Damage</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.heavymeleedamage : "-"}
                        </CompareItemValue>
                        <GoodIsGoodR
                          left={selectedL?.heavymeleedamage}
                          right={selectedR?.heavymeleedamage}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.staminaconsumption}
                          right={selectedR?.staminaconsumption}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.staminaconsumption : "-"}
                        </CompareItemValue>
                        <CompareItem>Stamina Consumption</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.staminaconsumption : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.staminaconsumption}
                          right={selectedR?.staminaconsumption}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedL?.price}
                          right={selectedR?.price}
                        />
                        <CompareItemValue>
                          {selectedL ? selectedL?.price : "-"}
                        </CompareItemValue>
                        <CompareItem>Weapon Price</CompareItem>
                        <CompareItemValue>
                          {selectedR ? selectedR?.price : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedL?.price}
                          right={selectedR?.price}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={selectedLAmmoType?.price_ammo}
                          right={selectedRAmmoType?.price_ammo}
                        />
                        <CompareItemValue>
                          {selectedLAmmoType
                            ? selectedLAmmoType.price_ammo
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Ammo Price</CompareItem>
                        <CompareItemValue>
                          {selectedRAmmoType
                            ? selectedRAmmoType.price_ammo
                            : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={selectedLAmmoType?.price_ammo}
                          right={selectedRAmmoType?.price_ammo}
                        />
                      </CompareRow>
                      <CompareRow>
                        <BadIsGoodL
                          left={
                            (selectedL?.price &&
                              selectedLAmmoType?.price_ammo) ||
                            (selectedL?.price &&
                              selectedLAmmoType?.price_ammo === 0)
                              ? selectedL.price + selectedLAmmoType.price_ammo
                              : undefined
                          }
                          right={
                            (selectedR?.price &&
                              selectedRAmmoType?.price_ammo) ||
                            (selectedR?.price &&
                              selectedRAmmoType?.price_ammo === 0)
                              ? selectedR.price + selectedRAmmoType.price_ammo
                              : undefined
                          }
                        />
                        <CompareItemValue>
                          {(selectedL?.price &&
                            selectedLAmmoType?.price_ammo) ||
                          (selectedL?.price &&
                            selectedLAmmoType?.price_ammo === 0)
                            ? selectedL.price + selectedLAmmoType.price_ammo
                            : "-"}
                        </CompareItemValue>
                        <CompareItem>Total Price</CompareItem>
                        <CompareItemValue>
                          {(selectedR?.price &&
                            selectedRAmmoType?.price_ammo) ||
                          (selectedR?.price &&
                            selectedRAmmoType?.price_ammo === 0)
                            ? selectedR.price + selectedRAmmoType.price_ammo
                            : "-"}
                        </CompareItemValue>
                        <BadIsGoodR
                          left={
                            (selectedL?.price &&
                              selectedLAmmoType?.price_ammo) ||
                            (selectedL?.price &&
                              selectedLAmmoType?.price_ammo === 0)
                              ? selectedL.price + selectedLAmmoType.price_ammo
                              : undefined
                          }
                          right={
                            (selectedR?.price &&
                              selectedRAmmoType?.price_ammo) ||
                            (selectedR?.price &&
                              selectedRAmmoType?.price_ammo === 0)
                              ? selectedR.price + selectedRAmmoType.price_ammo
                              : undefined
                          }
                        />
                      </CompareRow>
                    </CompareCol>
                  </CompareBox>
                </WeaponCompareContainer>
                <ChartContainer>
                  {selectedLAmmoType || selectedRAmmoType ? (
                    <DamageRangeChart
                      LName={selectedL?.name}
                      RName={selectedR?.name}
                      LCategory={selectedL?.category}
                      RCategory={selectedR?.category}
                      LAmmo={selectedLAmmoType}
                      RAmmo={selectedRAmmoType}
                    />
                  ) : (
                    <p>
                      Graph will be displayed after picking your weapon and
                      ammo!
                    </p>
                  )}
                </ChartContainer>
              </Col>
            </Row>
          </Container>
        )}
      </OutContainer>
      <Footer>
        <h3>by HYndrome</h3>
        <p>All damage is based on the upper torso and only for reference.</p>
        <p>For any suggestion, please reach me at hyndrome@gmail.com</p>
        <p>All image rights reserved to CRYTEK GMBH.</p>
      </Footer>
    </>
  );
}

export default Weapons;
