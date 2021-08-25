import React, { useState, useEffect, useCallback } from "react";
import ProvincesCitiesVN from "pc-vn";

const useProvinceDistrict = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [isProvince, setIsProvince] = useState(false);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const toggleProvince = useCallback(() => {
    setIsProvince(!isProvince);
    setIsDistrict(false);
    setIsWard(false);
  }, [isProvince]);

  const toggleDistrict = useCallback(() => {
    if (province) {
      setIsDistrict(!isDistrict);
      setIsProvince(false);
      setIsWard(false);
    }
  }, [isDistrict, province]);

  const toggleWard = useCallback(() => {
    if (province && district) {
      setIsWard(!isWard);
      setIsProvince(false);
      setIsDistrict(false);
    }
  }, [district, isWard, province]);

  const handleProvinceChoose = (e) => {
    const value = e.target.innerText;
    const province = provinces.find((province) => province.name === value);
    setDistrict(undefined);
    setWard(undefined);
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
    const provinces = ProvincesCitiesVN.getProvinces();
    const provincesWithShipPrice = provinces.map((item, index) => {
      return {
        ...item,
        shipPrice: [10000 + 2000 * index, 15000 + 2000 * index],
      };
    });
    setProvinces(provincesWithShipPrice);

    if (province) {
      const districts = ProvincesCitiesVN.getDistrictsByProvinceCode(
        province.code
      );
      setDistricts(districts);
    }

    if (district) {
      const wards = ProvincesCitiesVN.getWardsByDistrictCode(district.code);
      setWards(wards);
    }
  }, [district, isDistrict, isProvince, province, ward]);

  return {
    name,
    setName,
    phone,
    setPhone,
    street,
    setStreet,
    fullAddress,
    setFullAddress,
    isProvince,
    isDistrict,
    isWard,
    setIsProvince,
    setIsDistrict,
    setIsWard,
    provinces,
    districts,
    wards,
    province,
    setProvince,
    district,
    setDistrict,
    ward,
    setWard,
    toggleDistrict,
    toggleProvince,
    toggleWard,
    handleDistrictChoose,
    handleProvinceChoose,
    handleWardChoose,
  };
};

export default useProvinceDistrict;
