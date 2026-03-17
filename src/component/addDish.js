import { useState } from 'react';
import { Input, Button, message } from 'antd';
import { Select } from 'antd';

function DishForm() {
    const [dishName, setDishName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [flavor, setFlavor] = useState('');
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [location,setLocation]=useState('');
    const [type,setType]=useState('');
    const [taste,setTaste]=useState('');
    const handleDishNameChange = (e) => {
        setDishName(e.target.value);
    };
    /*const handleTasteChange = (value) => {
        setTaste(value);
    }*/
    const handlePriceChange =(e) =>{
        setPrice(e.target.value);
    }
    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleTasteChange = (e) => {
        setFlavor(e.target.value);
    };
    const handleLocationChange = (value) => {
        setLocation(value);
    };

    const handleTypeChange =(value) =>{
        setType(value)
        console.log(type)

    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = () => {
        if (dishName.trim() === '') {
            message.error('菜品名称不能为空');
            return;
        }

        const dishData = {
            name: dishName,
            type,
            //imageUrl,
            description,
            flavor,
            location,
            price,
        };

        fetch('http://localhost:8080/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dishData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Dish submitted successfully');
                    // 清空输入框
                    setDishName('');
                    setImageUrl('');
                    setFlavor('');
                }
                else {
                    console.error('Error submitting dish');
                }
            })
            .catch(error => console.error(error));
    };

    const Type = () => (
        <Select id={"类型"}
                //labelInValue
                value={type}

                style={{
                    width: 120,
                }}
                onChange={handleTypeChange}
                options={[
                    {
                        value: 1,
                        label: '面食',
                    },
                    {
                        value: 2,
                        label: '香锅',
                    },
                    {
                        value: 3,
                        label: '自选菜',
                    },
                    {
                        value: 4,
                        label: '铁板',
                    },
                    {
                        value: 5,
                        label: '木桶饭',
                    },
                    {
                        value: 6,
                        label: '其他',
                    },
                ]}
        />
    );

    const Location = () => (
        <Select id={"地址"}
                //labelInValue
                value={location}
                style={{
                    width: 120,
                }}
                onChange={handleLocationChange}
                options={[
                    {
                        value: 1,
                        label: '一餐',
                    },
                    {
                        value: 2,
                        label: '二餐',
                    },
                    {
                        value: 3,
                        label: '三餐',
                    },
                    {
                        value: 4,
                        label: '四餐',
                    },
                    {
                        value: 5,
                        label: '五餐',
                    },
                    {
                        value: 6,
                        label: '六餐',
                    },
                    {
                        value: 7,
                        label: '七餐',
                    },
                    {
                        value: 8,
                        label: '玉兰苑',
                    },
                ]}
        />
    );

    return (
        <div>
            <Input value={dishName} onChange={handleDishNameChange} placeholder="菜品名称" />
            <Input value={imageUrl} onChange={handleImageUrlChange} placeholder="菜品图片URL" />
            <Input value={flavor} onChange={handleTasteChange} placeholder="菜品口味" />
            <Input value={price} onChange={handlePriceChange} placeholder="菜品价格" />
            <Input value={description} onChange={handleDescriptionChange} placeholder="菜品描述" />
            <a>请选择餐厅位置</a>
            <Location/>
            <br/>
            <a>请选择菜品种类</a><Type/>
            <br/>
            <Button type="primary" onClick={handleSubmit}>提交</Button>

        </div>
    );
}

export default DishForm;
