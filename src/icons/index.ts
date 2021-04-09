import { App } from 'vue';
import SvgIcon from '@/icons/svg-icon.vue';

export default {
    install(app: App) {
        app.component('svg-icon', SvgIcon)
        // 必须
        const req = require.context('@/icons/svg', false, /\.svg$/)
        const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
        requireAll(req)
    }
}