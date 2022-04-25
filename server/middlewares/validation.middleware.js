export const validator = (schema) => async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body);
      next();
    }
    catch (err) {
      const { details } = err; 
      const message = details.map(i => i.message).join(',');
      res.status(400).json({ error: message });
    }
  }
