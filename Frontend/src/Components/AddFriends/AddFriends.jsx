import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendsToAdd } from '../../Actions/User'
import LikesUser from '../LikesUser/LikesUser'
import Loader from '../Loader/Loader'
import "./AddFriends.css"
const AddFriends = () => {
    const dispatch = useDispatch()

    const { users, loading } = useSelector((state) => state.addFriends)
    console.log("Aabou", users)
    useEffect(() => {
        dispatch(getFriendsToAdd())
    }, [dispatch])

    return loading ? <Loader /> : <div className="AddFriends">
        <div className="right-space"></div>
        <div className="friends-to-add">
            {
                users && users.map((user) => {
                    return <LikesUser key={user._id} friend={false} userId={user._id} avatar={user.avatar.url} name={user.name} request={false} addfriend={true} />
                })
            }
        </div>
        <div className="left-space"></div>
    </div>
}

export default AddFriends