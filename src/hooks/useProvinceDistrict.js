import React, { useState, useEffect } from "react";
import ProvincesCitiesVN from "pc-vn";

const useProvinceDistrict = () => {
  const [isProvince, setIsProvince] = useState(false);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const toggleProvince = () => {
    setIsProvince(!isProvince);
    setIsDistrict(false);
    setIsWard(false);
  };

  const toggleDistrict = () => {
    if (province) {
      setIsDistrict(!isDistrict);
      setIsProvince(false);
      setIsWard(false);
    }
  };

  const toggleWard = () => {
    if (province && district) {
      setIsWard(!isWard);
      setIsProvince(false);
      setIsDistrict(false);
    }
  };

  const handleProvinceChoose = (e) => {
    const value = e.target.innerText;
    const province = provinces.find((province) => province.name === value);
    setProvince(province);
    // setIsProvince(!isProvince);
    toggleProvince();
  };

  const handleDistrictChoose = (e) => {
    const value = e.target.innerText;
    const district = districts.find((district) => district.name === value);
    setWard(undefined);
    setDistrict(district);
    // setIsDistrict(!isDistrict);
    toggleDistrict();
  };

  const handleWardChoose = (e) => {
    const value = e.target.innerText;
    const ward = wards.find((ward) => ward.name === value);
    setWard(ward);
    // setIsWard(!isWard);
    toggleWard();
  };

  //Get and set province and set districts and district depend on province
  useEffect(() => {
    // effect
    if (!province) {
      const provinces = ProvincesCitiesVN.getProvinces();
      const provincesWithShipPrice = provinces.map((item, index) => {
        return {
          ...item,
          shipPrice: [10000 + 2000 * index, 15000 + 2000 * index],
        };
      });
      setProvinces(provincesWithShipPrice);
    } else {
      const districts = ProvincesCitiesVN.getDistrictsByProvinceCode(
        province.code
      );
      const wards = ProvincesCitiesVN.getWardsByProvinceCode(province.code);

      setDistrict(undefined);
      setDistricts(districts);
      setWard(undefined);
      setWards(wards);
    }
  }, [province]);

  return {
    isProvince,
    isDistrict,
    isWard,
    provinces,
    districts,
    wards,
    province,
    district,
    ward,
    toggleDistrict,
    toggleProvince,
    toggleWard,
    handleDistrictChoose,
    handleProvinceChoose,
    handleWardChoose,
  };
};

export default useProvinceDistrict;
