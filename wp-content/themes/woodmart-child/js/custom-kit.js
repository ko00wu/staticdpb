function customKit() {
  const $ = window.jQuery;
  const baseStyles = [
    'color: #fff',
    'background-color: #1779E1',
    'padding: 2px 8px',
    'border-radius: 4px',
  ].join(';')
  function consoleLog() {
    window.console
  }
  consoleLog('customKit init')
  const canvas = document.querySelector('#db-canvas'),
    imgUploaded = new Image()
  imgUploaded.src = ''
  const imgPixel = new Image()
  imgPixel.src = canvas.getAttribute('data-pixel-square-src')
  let uploadImg = ''
  document.querySelectorAll('.db-trigger-upload').forEach((e) => {
    e.addEventListener('click', function () {
      consoleLog('db-trigger-upload clicked'),
        document.querySelector('#custom_photo_init').click()
    })
  }),
    document
      .querySelector('#custom_photo_init')
      .addEventListener('change', function () {
        if (
          (consoleLog('User uploaded a file', this.files[0]),
          (document.querySelector('#custom_photo_init').files = this.files),
          this.files && this.files[0])
        ) {
          var imgSize = this.files[0].size
          if ((console.log('imgSize', imgSize), imgSize > 20 * 1024 * 1024))
            return alert('Image size limitation: No more than 20MB!'), !1
          document.querySelector('.db-section').classList.remove('db-hide'),
            (document.querySelector('.db-upload-loading').style.display =
              'block'),
//             getImgBase64Data(this.files[0], function (res) {
//               consoleLog('Image converted to base64'),
//                 (uploadImg = res),
//                 setTimeout(function () {
//                   updateDimensions()
//                 }, 200)
//             })
			getImgUrlByRemote(this.files[0], function (res) {
              ;(document.querySelector('#custom_photo_url').value = uploadImg =
                res),
                setTimeout(function () {
                  updateDimensions()
                }, 200)
            })
			
          const canvasY =
            document.querySelector('.db-section').getBoundingClientRect().top +
            window.scrollY -
            230
          consoleLog('scrollTo db-section', canvasY),
            window.scrollTo({
              top: canvasY,
              left: 0,
              behavior: window.matchMedia(
                '(prefers-reduced-motion: no-preference)'
              ).matches
                ? 'smooth'
                : 'auto',
            })
        }
      })
  const abDrillFormInput = document.querySelector('#custom_photo_ab_drill')
  // document
  //   .querySelector('input[name="ab-drills"]')
  //   .addEventListener('change', function () {
  //     consoleLog('AB-drills changed', this.checked),
  //       this.checked
  //         ? (abDrillFormInput.value = 'Yes')
  //         : (abDrillFormInput.value = 'No')
  //   })
  function updateDimensions(sizeValue, shapeValue) {
    consoleLog('updateDimensions')
    const inputDimensions = sizeValue || document.querySelector(
        'div[data-id="pa_canvas-size"] .wd-swatch.wd-active'
      ).dataset.value,
      inputDiamondSize = shapeValue || document.querySelector(
        'div[data-id="pa_diamond-shape"] .wd-swatch.wd-active'
      ).dataset.value;(imgPixel.src = canvas.getAttribute('data-pixel-square-src')),
      inputDiamondSize &&
        inputDiamondSize === 'round' &&
        (imgPixel.src = canvas.getAttribute('data-pixel-circle-src'))
    const size = inputDimensions,
      width = size.replace('cm', '').split('x')[0],
      height = size.replace('cm', '').split('x')[1]
    ;(canvas.width = width * 38),
      (canvas.height = height * 38),
      (document.getElementById('db-canvas').style.visibility = 'hidden'),
      setTimeout(function () {
        updateCanvas()
      }, 200)
  }
  $('div[data-id="pa_canvas-size"] .wd-swatch').on('click', function () {
      consoleLog('size changed', this.dataset.value), updateDimensions(this.dataset.value)
    }),
    $('div[data-id="pa_diamond-shape"] .wd-swatch').on('click', function () {
      consoleLog('shape changed', this.dataset.value), updateDimensions(null, this.dataset.value)
    }),
    document.querySelector('#zoomIn').addEventListener('click', () => {
      consoleLog('zoomIn'),
        zoomInstance.zoomTo(canvas.width / 2, canvas.height / 2, 1.5)
    }),
    document.querySelector('#zoomIn').addEventListener('touchstart', () => {
      consoleLog('zoomIn'),
        zoomInstance.zoomTo(canvas.width / 2, canvas.height / 2, 1.5)
    }),
    document.querySelector('#zoomOut').addEventListener('click', () => {
      consoleLog('zoomOut'),
        zoomInstance.zoomTo(canvas.width / 2, canvas.height / 2, 0.75)
    }),
    document.querySelector('#zoomOut').addEventListener('touchstart', () => {
      consoleLog('zoomOut'),
        zoomInstance.zoomTo(canvas.width / 2, canvas.height / 2, 0.75)
    })
  var zoomElement = document.querySelector('#db-canvas'),
    zoomInstance = panzoom(zoomElement, {
      maxZoom: 10,
      minZoom: 1,
      bounds: !0,
      boundsPadding: 1,
      zoomDoubleClickSpeed: 1,
    })
  function getImgBase64Data(file, callback) {
    var reader = new FileReader()
    ;(reader.onload = function (e) {
      callback(e.target.result)
    }),
      reader.readAsDataURL(file)
  }
  function getImgUrlByRemote(file, callback) {
    var formData = new FormData()
    formData.append('file', file)

    $.ajax({
      url: 'https://upload-custom-photo.managesites.workers.dev/', // 自定义 API 路由 URL
      type: 'POST',
      data: formData,
      processData: false, // 禁止 jQuery 自动处理数据
      contentType: false, // 不设置内容类型，让浏览器自动生成
      success: function (response) {
        if (response.file_url) {
//           alert('文件上传成功，文件 URL：' + response.file_url)
          console.log('文件 URL:', response.file_url)
          callback(response.file_url)
        } else {
//           alert('文件上传失败')
			console.error('文件上传失败')
        }
      },
      error: function (xhr, status, error) {
        console.error('上传出错:', error)
//         alert('上传失败，请重试')
      },
    })
  }
  function updateCanvas() {
    consoleLog('updateCanvas')
    var scale = {
        value: 10,
      },
      ctx = canvas.getContext('2d')
    ;(ctx.imageSmoothingEnabled = !1),
      (imgUploaded.src = uploadImg),
      (imgUploaded.onload = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		setTimeout(function () {
			var ratio, cw, ch
        imgUploaded.width > imgUploaded.height
          ? ((ratio = imgUploaded.width / imgUploaded.height),
            (cw = canvas.height * ratio),
            (ch = canvas.height))
          : ((ratio = imgUploaded.height / imgUploaded.width),
            (cw = canvas.width),
            (ch = canvas.width * ratio))
        var sw = (cw / scale.value) >> 0,
          sh = (ch / scale.value) >> 0
        ctx.drawImage(imgUploaded, 0, 0, sw, sh), (ctx.lineWidth = 0.5)
        for (var p = 1, x = 0; x <= canvas.width; x += 10)
          ctx.moveTo(x, p), ctx.lineTo(x, canvas.height)
        for (var x = 0; x <= ch; x += 10)
          ctx.moveTo(0, p + x), ctx.lineTo(cw, 0 + x)
        var xOffset = cw > canvas.width ? (canvas.width - cw) / 2 : 0,
          yOffset = ch > canvas.height ? (canvas.height - ch) / 2 : 0
        ;(yOffset = Math.ceil(yOffset / 10) * 10),
          (xOffset = Math.ceil(xOffset / 10) * 10),
          ctx.drawImage(canvas, 0, 0, sw, sh, xOffset, yOffset, cw, ch),
          setTimeout(function () {
            var pat = ctx.createPattern(imgPixel, 'repeat')
            ctx.rect(0, 0, cw, ch),
              (ctx.strokeStyle = 'rgba(0,0,0,0.1)'),
              (ctx.fillStyle = pat),
              ctx.fill(),
              (document.getElementById('db-canvas').style.visibility =
                'visible'),
              (document.querySelector('.db-upload-loading').style.display =
                'none')
          }, 800)	
		}, 800)
		
      })
  }
  // ;(document.querySelector('.buy-buttons').style.display = 'none'),
  //   document.querySelectorAll('.acceptTerms input').forEach(function (input) {
  //     input.addEventListener('click', function () {
  //       var unchecked = document.querySelectorAll(
  //         '.acceptTerms input:not(:checked)'
  //       ).length
  //       unchecked == 0
  //         ? ((document.querySelector('.buy-buttons').disabled = !1),
  //           (document.querySelector('.buy-buttons').style.display = 'flex'))
  //         : ((document.querySelector('.buy-buttons').disabled = !0),
  //           (document.querySelector('.buy-buttons').style.display = 'none'))
  //     })
  //   }),
  //   document.body.addEventListener('click', function (event) {
  //     if (event.target.matches('.single-option-selector')) {
  //       var unchecked = document.querySelectorAll(
  //         '.acceptTerms input:not(:checked)'
  //       ).length
  //       unchecked == 0
  //         ? ((document.querySelector('.buy-buttons').disabled = !1),
  //           (document.querySelector('.buy-buttons').style.display = 'flex'))
  //         : ((document.querySelector('.buy-buttons').disabled = !0),
  //           (document.querySelector('.buy-buttons').style.display = 'none'))
  //     }
  //   })
}
window.mobileCheck = function () {
  let check = !1
  return (
    (function (a) {
      ;(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )) &&
        (check = !0)
    })(navigator.userAgent || navigator.vendor || window.opera),
    check
  )
}
function mobileChangeCustomKitElementPlacement() {
  if (window.mobileCheck() === !1) return
  const whereCustomStepsGo = document.querySelector(
      '.product-info__custom-kit .text-gray-400.pb-6.block'
    ),
    customSteps = document.querySelector('.custom--steps-1-3'),
    customDesc = document.querySelector(
      '.product-info__custom-kit .product-info__description .prose'
    ),
    productDescription = document.querySelector(
      '.product-info > .product-info__description'
    ),
    disclaimer = document.querySelector('.db_disclaimer_wrapper'),
    productInfo = document.querySelector('.product-info')
  customSteps &&
    whereCustomStepsGo &&
    (productDescription.parentNode.insertBefore(
      customDesc,
      productDescription.nextSibling
    ),
    whereCustomStepsGo.parentNode.insertBefore(
      customSteps,
      whereCustomStepsGo.nextSibling
    ),
    productInfo.parentNode.insertBefore(disclaimer, productInfo.nextSibling))
}
document.addEventListener('DOMContentLoaded', function () {
  customKit(), mobileChangeCustomKitElementPlacement()
})
//# sourceMappingURL=/cdn/shop/t/241/assets/custom-kit.js.map?v=126186207367800793791716802461
