const toast = document.getElementById('toast')
let toastTimeout

function showToast(message) {
  if (!toast) {
    return
  }

  toast.textContent = message
  toast.classList.add('is-visible')

  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible')
  }, 2200)
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    showToast('Đã sao chép số tài khoản — xin cảm ơn Quý Khách!')
  } catch {
    showToast('Không thể sao chép — vui lòng chọn thủ công.')
  }
}

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.copy
    if (value) {
      copyText(value)
    }
  })
})

document.querySelectorAll('.account-number').forEach((element) => {
  element.addEventListener('click', () => {
    const value = element.dataset.copy
    if (value) {
      copyText(value)
    }
  })
})

function initGallerySlider() {
  const slider = document.querySelector('[data-gallery-slider]')
  const track = document.querySelector('[data-gallery-track]')
  const dotsContainer = document.querySelector('[data-gallery-dots]')
  const prevBtn = document.querySelector('[data-gallery-prev]')
  const nextBtn = document.querySelector('[data-gallery-next]')

  if (!slider || !track || !dotsContainer) {
    return
  }

  const slides = [...track.children]
  let currentIndex = 0
  let touchStartX = 0

  slides.forEach((_, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'gallery-slider__dot'
    dot.setAttribute('role', 'tab')
    dot.setAttribute('aria-label', `Ảnh ${index + 1}`)
    dot.addEventListener('click', () => {
      goTo(index)
    })
    dotsContainer.appendChild(dot)
  })

  const dots = [...dotsContainer.children]

  function goTo(index) {
    currentIndex = (index + slides.length) % slides.length
    track.style.transform = `translateX(-${currentIndex * 100}%)`

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex)
      dot.setAttribute('aria-selected', dotIndex === currentIndex ? 'true' : 'false')
    })
  }

  prevBtn?.addEventListener('click', () => {
    goTo(currentIndex - 1)
  })

  nextBtn?.addEventListener('click', () => {
    goTo(currentIndex + 1)
  })

  track.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX
  }, { passive: true })

  track.addEventListener('touchend', (event) => {
    const diff = touchStartX - event.changedTouches[0].screenX
    if (Math.abs(diff) < 40) {
      return
    }
    if (diff > 0) {
      goTo(currentIndex + 1)
    }
    if (diff < 0) {
      goTo(currentIndex - 1)
    }
  }, { passive: true })

  goTo(0)
}

initGallerySlider()
