export const validator = (schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    }
    catch (err) {
      const { details } = err; 
      const message = details.map(i => i.message).join(',');
      console.log(message);
      res.status(400).json({ error: message });
      //res.status(400).send(err);
    }
  }
