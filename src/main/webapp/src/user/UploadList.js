import React, { useEffect, useState } from 'react';
import talon from '../image/talon.jpeg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UploadList = () => {
    const [list, setList] = useState([])

    useEffect(() => {

        axios.get('/user/uploadList')
             .then(res => {
                setList(res.data)
                console.log(res.data)
             })
             .catch(error => console.log(error))
    }, [])
    return (
        <div>
            <h3>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <td>이미지</td>
                            <td>상품명</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(item => <tr key={item.seq} style={{ textAlign:'center'}}>
                                <td>{item.seq}</td>
                                <td>
                                    <img src={`../storage/${encodeURIComponent(item.imageOriginalName)}`} 
                                         alt={item.imageName} 
                                         style={{width:100, height:100}} />
                                </td>
                                <td>{item.imageName}</td>
                            </tr>)
                        }             
                    </tbody>
                    <tfoot></tfoot>
                </table>

                <Link to='/'>
            	    <img src={ talon } alt='탈?론' width='100' height='100' />
                </Link>
            </h3>
        </div>
    );
};

export default UploadList;