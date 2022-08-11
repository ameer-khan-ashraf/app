import { useState } from "react";
import { useRouter } from "next/router";
import Card from "../../../components/Card";
import CardBody from "../../../components/CardBody";
import ImageCard from "../../../components/Cards/ImageCard";
import Characteristic from "../../../components/Characteristic";
import Layout from "../../../containers/Layout";
import ModuleContainer from "../../../containers/ModuleContainer";
import { useThingById } from "../../../features/organize/organizeApi";
import { useCategories,useSubcategoriesByCategoryId } from "../../../features/collect/collectApi";
import Select from 'react-select';
function Thing() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useThingById(parseInt(id));
  const categoryData = useCategories().data;
  let categoryId = undefined;
  if (categoryData && data){
    categoryData.forEach(element => {
       if (element.node.name.toString() == data.category.name.toString()){
        categoryId = element.node.id
       }
    });
  }
  let subcategoryData = useSubcategoriesByCategoryId(
    categoryId,
    { enabled: !!data?.category }
  ).data;
  const prepareOptions = () => {
    if(editMode ==='category'){
      return categoryData?.map((option) => ({
        value: option?.node?.id,
        label: option?.node?.name,
      }));
    }
    if(editMode==='subCategory'){
      return subcategoryData?.map((option) => ({
        value: option?.node?.id,
        label: option?.node?.name,
      }));
    }
  };
  const handleOnChange = (value) =>{
    if(editMode ==='category'){
      
    }
    if(editMode==='subCategory'){
      
    }
  }
  const [editMode,setEditMode] = useState(false);
  return (
    <>
      <ModuleContainer moduleName={`thing #${id}`} moduleColor={"black"}>
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <Card>
              <CardBody className="flex flex-col">
                <div className="flex flex-row gap-2 overflow-x-auto">
                  {data.media &&
                    data.media.map((url, index) => (
                      <div key={index} className="flex-shrink-0 w-48">
                        <ImageCard key={index} index={index} media={url} />
                      </div>
                    ))}
                </div>
                <div className="flex flex-col m-2">
                    {
                      editMode ==='category'?
                      <Select onChange={handleOnChange} isSearchable={true} defaultValue={data.category.name} placeholder={data.category.name} options={prepareOptions()}/>:
                      <div className="flex justify-between my-1">
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                          {data.category.name}
                        </p>
                        <button onClick={()=>setEditMode("category")} className="self-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center hover:fill-slate-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    }
                    
                    {
                      editMode==='subCategory'?
                      <Select onChange={handleOnChange} isSearchable={true} defaultValue={data?.subcategory?.name} placeholder={data?.subcategory?.name} options={prepareOptions()}/>:
                      <div className="flex justify-between my-1">
                          <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
                            {data.subcategory.name}
                          </p>
                          <button onClick={()=>setEditMode("subCategory")} className="self-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:fill-slate-300" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                          </button>
                      </div>
                    }
                    
                </div>
                {data.characteristics?.edges.map((char) => (
                  <Characteristic
                    key={char.node.attributeId}
                    characteristic={char.node}
                  />
                ))}
                <br />
              </CardBody>
            </Card>
          </>
        )}
      </ModuleContainer>
    </>
  );
}

export default Thing;

Thing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
