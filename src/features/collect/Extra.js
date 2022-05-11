import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBrand,
  setCondition,
  setDescription,
  setMaterial,
  setQuantity,
  setSize,
} from "./collectSlice";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { conditions } from "../../utils/categories";
import Button from "../../components/Button";
import Header from "../../components/Header";

function Extra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brand = useSelector((state) => state.collect.brand);
  const material = useSelector((state) => state.collect.material);
  const size = useSelector((state) => state.collect.size);
  const condition = useSelector((state) => state.collect.condition);
  const description = useSelector((state) => state.collect.description);
  const quantity = useSelector((state) => state.collect.quantity);
  const { register, handleSubmit } = useForm({
    defaultValues: { brand, material, size, condition, description, quantity },
  });

  const onSubmit = (data) => {
    dispatch(setBrand(data.brand));
    dispatch(setMaterial(data.material));
    dispatch(setSize(data.size));
    dispatch(setCondition(data.condition));
    dispatch(setMaterial(data.material));
    dispatch(setDescription(data.description));
    dispatch(setQuantity(data.quantity));
    navigate("/review");
  };

  return (
    <>
      <Header pageNumber={"4"} />
      <form
        id="extra"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full w-full"
      >
        <div>
          <Input label="brand" register={register} />
          <Input label="material" register={register} />
          <Input label="size" register={register} />
          <Select
            label="condition"
            {...register("condition")}
            options={conditions}
          />
          <Input label="description" register={register} />
          <Input label={"quantity"} type="number" register={register} />
        </div>
        <Button form="extra" type="submit">Next</Button>
      </form>
    </>
  );
}

export default Extra;