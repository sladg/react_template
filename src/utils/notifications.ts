import notification from 'antd/es/notification'
import 'antd/es/notification/style/css'

export const openNotification = (type: 'success' | 'info' | 'warning' | 'error', title: string, description: string, duration?: number) => {
    notification[type]({
        message: title,
        description,
        duration,
    })
}
