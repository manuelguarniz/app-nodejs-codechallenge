import app from './app';
import { PROPS } from './configs/props.config';

const port = PROPS.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
