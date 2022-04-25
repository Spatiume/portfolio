export const bgBlueDecorator = () => {
  return {
    data: () => ({
      styles: {
        padding: '20px',
        background: 'linear-gradient(to top, #3e3e59, #454573)',
      }
    }),
    template: `
    <div :style="styles"> <story /> </div>
    `
  }
}