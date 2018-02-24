
function build() {
  try {
    require('./bot')();
  } catch (err) {
    console.error(err);
  }
}

build();
