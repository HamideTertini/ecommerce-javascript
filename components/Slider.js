const images = [
    'https://iqq6kf0xmf.gjirafa.net/images/4eff7c1a-6d4c-4794-a8e9-70b54cabb392/4eff7c1a-6d4c-4794-a8e9-70b54cabb392.jpeg?w=1046',
    'https://iqq6kf0xmf.gjirafa.net/images/ce96b00c-cbb2-46ce-a43f-bfa5cf89ec35/ce96b00c-cbb2-46ce-a43f-bfa5cf89ec35.jpeg?w=1046',
    'https://iqq6kf0xmf.gjirafa.net/images/2d123aaf-2369-447e-a8ba-3b815dddcd02/2d123aaf-2369-447e-a8ba-3b815dddcd02.jpeg?w=1046',
    'https://iqq6kf0xmf.gjirafa.net/images/aca9ce45-2024-46dc-b661-6fd7a7edd7ee/aca9ce45-2024-46dc-b661-6fd7a7edd7ee.jpeg?w=1046'
]
let active_image = 1

export default function Slider(container) {
    setInterval(() => {
        container.innerHTML = `
            <img src="${images[active_image]}" class="w-full" alt="Slider image" />
        `

        if(active_image >= (images.length - 1)) {
            active_image = 0
        } else {
            active_image++;
        }
    }, 3000)
}