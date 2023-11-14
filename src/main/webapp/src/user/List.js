import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import talon from '../image/talon.jpeg';
import axios from 'axios';
import styles from '../css/List.module.css';

const List = () => {
    const {page} = useParams()

    const [list, setList] = useState([]);
    const [pagingArray, setPagingArray] = useState([])

    const [keyword, setKeyword] = useState('')
    const [columnName, setColumnName] = useState('name')
    const [searchList, isSearchList] = useState(false) 
    const navigate = useNavigate()

    useEffect(() => {
        //getUserList?page=${page}
        keyword ==='' ?

        axios
        .get(`/user/getUserList?page=${page}`)
        .then(res => {
            setList(res.data.content)
            console.log(res.data)
            setPagingArray(Array.from({ length : res.data.totalPages}, (_, index) => index + 1))
            console.log(page)
        })
        .catch((error) => console.log(error))

        :

        axios
        .get(`/user/getUserSearchList?page=${page}`, {
            params: {
                columnName: columnName, 
                keyword : keyword
            }})
        .then(res => {
            setList(res.data.content)
            setPagingArray(Array.from({ length : res.data.totalPages}, (_, index) => index + 1))
            console.log(res.data)
        })
        .catch((error) => console.log(error));
    }, [page, searchList]); //페이지랑 검색을 클릭할때

    //검색할때는 1페이지부터
    const onSearchList=(e) =>{
        e.preventDefault()

        isSearchList(!searchList)
        navigate('/user/list/0')
    }

    return (
        <div>
            <input type="hidden" id="page" value="${page}" />
            <table border="1" frame="hsides" rules="rows" className={styles.userListTable}>
                <thead>
                    <tr>
                        <th width="150">이 름</th>
                        <th width="150">아이디</th>
                        <th width="150">비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                {/* <!-- 동적 처리 --> */}
                    {
                        list.map((item, index) => {
                            return (
                                    <tr key={index}>
                                    <td height='30' align='center'>{item.name}</td>
                                    <td height='30' align='center'>
                                            <Link className={styles.subjectA} to={`/user/updateForm/${item.id}`}>
                                                {item.id}
                                            </Link>
                                        </td>
                                    <td height='30' align='center'>{item.pwd}</td>
                                    </tr>
                                );
                        })}
                </tbody>
                <tfoot></tfoot>
            </table>
            <br />
            {/* 페이징 처리 */}
            <p style={{width:'500px', textAlign:'center' }}>
                {   
                    pagingArray.map(item => <span key={ item }>
                        {/* page는 useParams()로 받은 객체라서 parseInt()사용 */}
                        <Link id={(item-1) === parseInt(page) ? styles.currentPaging : styles.paging}
                              to={`/user/list/${item-1}` }>{ item }</Link>
                    </span>)
                }
            </p>

            {/* 검색 */}
            <div style={{width: '450px', textAlign: 'center', marginLeft:'20px'}}>
                <form id="searchListForm">
                    <select name="columnName" style={{width: '100px', height:'22px'}} onChange={ e=>setColumnName(e.target.value) } >
                        <option value="name">이름</option>
                        <option value="id">아이디</option>
                    </select>&nbsp;
                    <input style={{height:'17px'}} type="text" name='keyword' value={ keyword } onChange={ e=>setKeyword(e.target.value) } />
                    &nbsp; <button onClick={ onSearchList } id="searchListBtn">검색</button>
                </form>
            </div>
            <h3>
                <Link to='/'>
            	    <img src={ talon } alt='탈?론' width='100' height='100' />
                </Link>
            </h3>
        </div>
    );
};

export default List;