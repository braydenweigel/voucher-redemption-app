CREATE OR REPLACE FUNCTION set_redeemed_at()
RETURNS trigger AS $$
BEGIN
  IF NEW.redeemed = true AND OLD.redeemed = false THEN
    NEW."redeemedat" = now();
  ELSIF NEW.redeemed = false AND OLD.redeemed = true THEN
    NEW."redeemedat" = NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_redeemed_at
BEFORE UPDATE ON public.vouchers
FOR EACH ROW
EXECUTE FUNCTION set_redeemed_at();