import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import talon from '../image/talon.jpeg';
import styles from '../css/UpdateForm.module.css';

const UpdateForm = () => {

    const { userId } = useParams()

    console.log( userId )

    const[userDTO,setUserDTO] = useState({
        name : '',
        id : '',
        pwd : ''
    })

    const { name, id, pwd} = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const navigate = useNavigate()

    const [reset,setReset] = useState()

    const onInput = (e) => {
        const {name, value} = e.target;
        
        setUserDTO({...userDTO, 
            [name]:value
        })
    }

    const onUpdateSubmit = (e) => {
        e.preventDefault()

        var sw = 1
        //유효성 검사
        if(!name){
            setNameDiv('이름 입력')
            sw = 0
        }
        if(!pwd){
            setPwdDiv('비밀번호 입력')
            sw = 0
        }
        if(sw === 1){
            axios.put(`/user/update`, null, { //null은 주소값 매개변수와 같다.
                params : userDTO
            }).then(
                alert('회원정보 수정 완료!'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }

    }

    const onDeleteSubmit = (e) => {
        e.preventDefault()

        axios.delete(`/user/delete?id=${userId}`)
             .then(
                alert('회원정보 삭제 완료!'),
                navigate('/user/list')
            ).catch(error => console.log(error))
    }

    const onReset = (e) => {
        setReset(!reset)
    }

    useEffect(() => {
        axios
        .get(`/user/getUser?id=${userId}`)
        .then(res => setUserDTO(res.data))
        .catch((error) => console.log(error));
    }, [reset])

    return (
        <div>
            <form className={styles.updateForm} >
                <table border="1">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이 름</th>
                            <td><input type="text" name="name" value={name} onChange={ onInput } />
                                <div id="nameDiv"> {nameDiv} </div>
                            </td>
                        </tr>  
                        <tr>
                            <th>아이디</th>
                            <td width="200"><input type="text" name="id" value={userId} readOnly />
                                <div id="idDiv"></div>
                            </td>
                        </tr>  
                        <tr>
                            <th>비밀번호</th>
                            <td><input type="password" name="pwd" value={pwd} onChange={ onInput } />
                                <div id="pwdDiv"> {pwdDiv} </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button onClick={ onUpdateSubmit }>수정</button>&emsp;
                                <button onClick={ onDeleteSubmit }>삭제</button>&emsp;
                                <button onClick={ ()=> navigate('/user/list') }>목록</button>&emsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
            <h3>
                <Link to='/'>
            	    <img src={ talon } alt='탈?론' width='100' height='100' />
                </Link>
            </h3>
        </div>
    );
};

export default UpdateForm;