export default function STitle({
  title,
  description,
  sectionClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  return (
    <section className={sectionClassName}>
      {title ? <h2 className={titleClassName || undefined}>{title}</h2> : null}
      {description ? (
        <p className={descriptionClassName || undefined}>{description}</p>
      ) : null}
    </section>
  );
}
