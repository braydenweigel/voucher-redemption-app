ALTER TABLE public.vouchers
ALTER COLUMN "voucherid" DROP DEFAULT;

ALTER TABLE public.vouchers
ALTER COLUMN "voucherid" TYPE text
USING "voucherid"::text;

ALTER TABLE public.vouchers
ALTER COLUMN batch TYPE text
USING batch::text;