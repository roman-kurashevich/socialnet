import axios from "axios";

const instance = axios.create({

  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "78db3ef8-b9d0-41d5-9ed1-ce31346be1e0"
  }
})

export const userAPI = {

  getUsers(currentPage = 1,pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data)
  },


  unfollow(id) {
    return instance.delete(`follow/${id}`)
  },

  follow(id) {
    return instance.post(`follow/${id}`)
  },

  getProfile(id) {
    console.log('Please profileAPI')
    return profileAPI.getProfile(id)
  }

}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`)
    .then(response => response.data)
  },
  getStatus(id) {
    return instance.get(`profile/status/${id}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile) {
    return instance.put('profile', profile)
  },
}

export const authAPI = {
  
  me() {
    return instance.get('auth/me')
    .then(response => response.data)
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('auth/login', {
      email,
      password,
      rememberMe,
      captcha
    })
  },
  logout() {
    return instance.delete('auth/login')
  },

}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url');
  }
}
