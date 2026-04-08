alter table public.vouchers
    add column revoked boolean not null default false,
    add column revokedat timestamptz;

CREATE OR REPLACE FUNCTION set_revoked_at()
RETURNS trigger AS $$
BEGIN
  IF NEW.revoked = true AND OLD.revoked = false THEN
    NEW."revokedat" = now();
  ELSIF NEW.revoked = false AND OLD.revoked = true THEN
    NEW."revokedat" = NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_revoked_at
BEFORE UPDATE ON public.vouchers
FOR EACH ROW
EXECUTE FUNCTION set_revoked_at();