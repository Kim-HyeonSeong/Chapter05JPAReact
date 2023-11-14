import React, { useRef, useState } from 'react';
import cameraImg from '../image/camera.png';
import talon from '../image/talon.jpeg';
import styles from '../css/UploadForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadForm = () => {
    const imgRef = useRef()

    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName: '',
        imageContent: '',
        imageFileName: '',
        imageOriginalName:'',
    }) //객체는 {}

    const { imageName, imageContent, imageFileName, imageOriginalName } = userUploadDTO

    const [imgList, setImgList] = useState([]) //배열은 []
    const [files, setFiles] = useState('')

    const navigate = useNavigate()

    const onInput = (e) => {
        const {name, value} = e.target

        setUserUploadDTO({
            ...userUploadDTO,
            [name] : value
        })
    }

    const onCamera = () => {
        imgRef.current.click()
    }

    const onImgInput = (e) => {
        const imgfiles = Array.from(e.target.files)
        var imgArray = []

        imgfiles.map(item => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)
        })

        setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
        setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기 용도
    }

    const onUploadSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()       
        formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], {type: 'application/json'}))
        // for(var i=0; i<files.length; i++){
        //     formData.append('img', files[i])
        // }
        Object.values(files).map((item, index) => {
            formData.append('img', item)
        })

        axios.post(
            '/user/upload', 
            formData, 
            {
                headers: {             
                    'Content-Type' : 'multipart/form-data',
                }
        })
        .then( res => {
            alert('이미지 업로드 완료')
            navigate('/user/uploadList')
        })
        .catch(error => console.log(error))
    }

    const onReset = (e) => {
        e.preventDefault()

        setUserUploadDTO({
            imageName: '',
            imageContent: '',
            imageFileName: '',
            imageOriginalName:'',
        })
    
        setImgList([])
        imgRef.current.value= ''
    }

    /*
    const readURL = (input) =>{
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])

        reader.onload = () => {
            console.log(input.files[0])
            setShowImgSrc(reader.result)
            setFile(input.files[0])
        }
    }
    */

    return (
        <div>
            <form className="uploadForm" style={ styles.UploadForm }>
                <table border={1}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th width={100}>상품명</th>
                            <td><input type="text" name="imageName" value={imageName} size='35' onChange={ onInput } /></td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2} align='center'>
                            <textarea name="imageContent" rows='10' cols='55' value={ imageContent } onChange={ onInput }></textarea>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2}>
                                <span>
                                    {   
                                        //선택한 이미지를 미리보기
                                        imgList.map((item, index) => <img key={ index } 
                                                                          src={ item } 
                                                                          style={{ width:'100px', height:'100px' }} />)
                                    }
                                </span>
                                
                                <img src={ cameraImg } alt="카메라"
                                    onClick={ onCamera }
                                    style={{width:70, height:50, borderRadius:20}} />
                                <input type="file"name="img[]"
                                       multiple="multiple"
                                       onChange={ onImgInput } 
                                       ref={ imgRef } style={{visibility:'hidden'}} />
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2} align="center">
                                <button name="uploadBtn" onClick={ onUploadSubmit }>이미지 업로드</button> &nbsp;&nbsp;
                                <button name="reset" onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                        </tbody>
                    <tfoot></tfoot>	
                </table>
                <br />
                <div id="resultDiv">
                </div>
            </form>

            <h3>
                <Link to='/'>
            	    <img src={ talon } alt='탈?론' width='100' height='100' />
                </Link>
            </h3>
        </div>
    );
};

export default UploadForm;