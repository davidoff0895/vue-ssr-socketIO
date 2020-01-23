const toastOptions = {
  action : {
    onClick : (e: any, toastObject: any) => {
      toastObject.goAway(0)
    },
    text : 'х'
  },
  className: 'custom-toaster',
  closeOnSwipe: true,
  duration: '3000',
  fullWidth: true,
  position: 'top-center',
  type: 'error'
}
export default toastOptions
