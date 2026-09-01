"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { contactFormData } from "../data/contactData";
import "./contact-form.css";

export default function ContactForm() {
  const reduceMotion = useReducedMotion();

  const [formStatus, setFormStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    setFormStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to send your enquiry. Please try again.",
        );
      }

      form.reset();
      setFormStatus("success");
      setFeedback(contactFormData.successMessage);
    } catch (error) {
      setFormStatus("error");
      setFeedback(error.message);
    }
  }

  return (
    <section
      id="contact-form"
      className="contact-enquiry"
      aria-labelledby="contact-enquiry-title"
    >
      <div className="site-container contact-enquiry-container">
        <motion.div
          className="contact-enquiry-intro"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 40 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="contact-enquiry-label">
           
            <span className="contact-enquiry-label-line" />
            <span>{contactFormData.eyebrow}</span>
          </div>

          <h2 id="contact-enquiry-title">
            {contactFormData.title}
            <span>{contactFormData.highlightedTitle}</span>
          </h2>

          <p>{contactFormData.description}</p>

          <a
            href="mailto:etravfxprod@etradreams.com"
            className="contact-enquiry-email"
          >
            <span>Direct email</span>
            <strong>etravfxprod@etradreams.com</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <motion.div
          className="contact-enquiry-panel"
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 55 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            delay: reduceMotion ? 0 : 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="contact-enquiry-panel-top">
            <span>Project enquiry</span>
            <span>Fields marked * are required</span>
          </div>

          {formStatus === "success" ? (
            <div
              className="contact-enquiry-success"
              role="status"
            >
              <span
                className="contact-enquiry-success-icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <h3>{contactFormData.successTitle}</h3>
              <p>{feedback}</p>

              <button
                type="button"
                onClick={() => {
                  setFormStatus("idle");
                  setFeedback("");
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              className="contact-enquiry-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-enquiry-fields">
                {contactFormData.fields.map((field) => (
                  <div
                    className="contact-enquiry-field"
                    key={field.id}
                  >
                    <label htmlFor={field.id}>
                      {field.label}
                      {field.required && (
                        <span aria-hidden="true"> *</span>
                      )}
                    </label>

                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>

              <div className="contact-enquiry-field contact-enquiry-field-full">
                <label htmlFor="service">
                  Service Required
                  <span aria-hidden="true"> *</span>
                </label>

                <div className="contact-enquiry-select">
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    {contactFormData.serviceOptions.map(
                      (service) => (
                        <option
                          value={service}
                          key={service}
                        >
                          {service}
                        </option>
                      ),
                    )}
                  </select>

                  <span aria-hidden="true">↓</span>
                </div>
              </div>

              <div className="contact-enquiry-field contact-enquiry-field-full">
                <label htmlFor="message">
                  Project Details
                  <span aria-hidden="true"> *</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project, timeline, scope, and requirements..."
                  rows="7"
                  required
                />
              </div>

              <div className="contact-enquiry-submit-row">
                <p>
                  By submitting this form, you agree to be
                  contacted regarding your enquiry.
                </p>

                <button
                  type="submit"
                  className="contact-enquiry-submit"
                  disabled={formStatus === "submitting"}
                >
                  <span>
                    {formStatus === "submitting"
                      ? "Sending..."
                      : contactFormData.submitLabel}
                  </span>

                  <span aria-hidden="true">
                    {formStatus === "submitting" ? "…" : "↗"}
                  </span>
                </button>
              </div>

              {formStatus === "error" && (
                <p
                  className="contact-enquiry-error"
                  role="alert"
                >
                  {feedback}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}