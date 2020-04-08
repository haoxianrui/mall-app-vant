<!-- 用户登录 -->

<template>
    <div class="login">
        <van-nav-bar
                title="用户登录"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 登录注册框 -->
        <div class="login-box">
            <van-tabs type="card" @click="onClick">
                <van-tab name="login" title="登录">
                    <van-form @submit="onSubmitLogin">
                        <van-field
                                v-model="login_user.username"
                                name="用户名"
                                label="用户名"
                                placeholder="用户名"
                        />
                        <van-field
                                v-model="login_user.password"
                                type="password"
                                name="密码"
                                label="密码"
                                placeholder="密码"
                        />
                        <div style="margin: 16px;">
                            <van-button block type="info" color="linear-gradient(to right, #4bb0ff, #6149f6)"
                                        native-type="submit">
                                登录
                            </van-button>
                        </div>
                    </van-form>

                </van-tab>
                <van-tab name="register" title="注册">
                    <van-form @submit="onSubmitRegister">
                        <van-field
                                v-model="register_user.username"
                                name="用户名"
                                label="用户名"
                                placeholder="用户名"
                        />
                        <van-field
                                v-model="register_user.password"
                                type="password"
                                name="密码"
                                label="密码"
                                placeholder="密码"
                        />
                        <van-field
                                v-model="register_user.confirmPassword"
                                type="password"
                                name="确认密码"
                                label="确认密码"
                                placeholder="确认密码"
                        />
                        <div style="margin: 16px;">
                            <van-button block type="info" color="linear-gradient(to right, #4bb0ff, #6149f6)"
                                        native-type="submit">
                                注册
                            </van-button>
                        </div>
                    </van-form>

                </van-tab>
            </van-tabs>
        </div>

        <!-- 第三方登录 -->
        <div class="login-third-login">
            <van-divider>
                其他登录方式
            </van-divider>
            <van-grid :column-num="2" :border=false>
                <van-grid-item @click="thirdLogin(0)">
                    <svg-icon iconClass="wechat"/>
                    <span class="title">微信登录</span>
                </van-grid-item>
                <van-grid-item @click="thirdLogin(1)">
                    <svg-icon iconClass="QQ"/>
                    <span class="title">QQ登录</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import {mapActions} from 'vuex'
    import {login} from '@/api/user'

    export default {
        name: "login",
        data() {
            return {
                login_user: {
                    username: undefined,
                    password: undefined,
                },
                register_user: {
                    username: undefined,
                    password: undefined,
                    confirmPassword: undefined
                }
            }
        },
        methods: {
            ...mapActions(['syncUserInfo']),
            onClickLeft() {
                this.$router.go(-1)
            },
            onClick(name, title) {
                if (name === "login") {
                    this.login_user = {
                        username: undefined,
                        password: undefined,
                    }
                } else if (name === "register") {
                    this.register_user = {
                        username: undefined,
                        password: undefined,
                        confirmPassword: undefined
                    }
                }
            },
            // 第三方登录
            thirdLogin(value) {
                if (value == 0) {
                    Toast({
                        message: '微信登录',
                        duration: 800
                    });
                } else {
                    Toast({
                        message: 'QQ登录',
                        duration: 800
                    });
                }
            },
            onSubmitLogin(values) {
                if (!this.login_user.username) {
                    Toast({
                        message: '请填写用户名',
                        duration: 800
                    });
                    return
                }
                if (!this.login_user.password) {
                    Toast({
                        message: '请填写密码',
                        duration: 800
                    });
                    return
                }

                login(values).then(response => {
                    this.syncUserInfo(response.data)
                    this.$router.back()
                })
            },
            onSubmitRegister() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .login {
        height: 100%;
        background: #FFFFFF;

        &-box {
            padding: 4rem 1rem;

            .van-form {
                padding: 1rem 0;
            }
        }

        &-third-login {
            padding: 2rem;

            .van-divider {
                color: #1989fa;
                border-color: #1989fa;
                padding: 0 5px;
            }

            .title {
                padding: 0.5rem;
                font-size: 0.5rem;
                color: #666;
            }
        }
    }

</style>